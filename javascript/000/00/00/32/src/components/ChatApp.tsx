import {
    Card,
    CardContent,
    TextField,
    CardActions,
    Button,
    Grid,
    ListItem,
    ListItemText,
    Box,
    Avatar,
    Chip,
    Typography,
  } from '@mui/material';
  import { useComponent } from '@state-less/react-client';
  import { useEffect, useRef, useState } from 'react';

  export const ChatApp = () => {
    const [items, setItems] = useState(10);
    const [room, { loading }] = useComponent('room-global', {
      props: {
        num: items,
      },
    });
    const { messages = [], sendMessage } = room?.props || {};
    const [text, setText] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setTimeout(() => {
        ref.current?.scrollTo({
          top: ref.current?.scrollHeight,
        });
      }, 100);
    }, [loading]);

    return (
      <Card sx={{width: '100%'}}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Button
                  disabled={items >= room?.props?.total}
                  onClick={() => setItems(items + 10)}
                  sx={{ mx: 'auto' }}
                >
                  Load More {items}
                </Button>
              </Box>
  
              <Box
                sx={{
                  height: '500px',
                  overflowY: 'scroll',
                }}
                ref={ref}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  {messages.map((message) => {
                    return (
                      <Card>
                        <CardContent sx={{ py: '0px !important' }}>
                          <Typography>{message?.message}</Typography>
                        </CardContent>
                        <CardActions>
                          {new Date(message?.timestamp).toLocaleString()}
                          <Chip
                            sx={{ ml: 'auto' }}
                            avatar={
                              <Avatar
                                sx={{ width: 24, height: 24 }}
                                src={
                                  message?.author?.user?.strategies?.google
                                    ?.decoded?.picture
                                }
                              />
                            }
                            label={
                              message?.author?.user?.strategies?.google?.decoded
                                ?.name || message?.author?.id
                            }
                          ></Chip>
                        </CardActions>
                      </Card>
                    );
                  })}
                </Box>
              </Box>
  
              <TextField
                fullWidth
                rows={3}
                multiline
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mt: 1 }}
              ></TextField>
            </Grid>
            <Grid item xs={3}>
              {room?.props?.clients?.map?.((client) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={
                        client?.user?.strategies?.google?.decoded?.name ||
                        client?.id
                      }
                    ></ListItemText>
                  </ListItem>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            disabled={text?.length < 3}
            onClick={() => {
              sendMessage(text);
              setText('');
            }}
          >
            Send
          </Button>
        </CardActions>
      </Card>
    );
  };
  