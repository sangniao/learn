import React ,  { useEffect, useRef, useState }   from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from './mutations'


export default function CreatePost() {

    const titleRef = useRef();
    const bodyRef = useRef();
    const [ state, setState ] = useState('')

    const [addPost, { data, loading, error }] = useMutation( CREATE_POST );

    useEffect(()=>{
       
        if( data ) {
          let { id, title , body  } = data.createPost;
          setState( `Post added: ID: ${ id }  , Title: ${ title }  , Body: ${ body }`  );
        }
         
    },[ data ]);
 
 
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
   

 
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
         
            addPost({
                variables: {
                    input: {
                        title: titleRef.current.value ,
                        body: bodyRef.current.value }
            }});

            titleRef.current.value = '';
            bodyRef.current.value = '';
          }}
        >
          <label>Title: </label><input  placeholder="Ex: Test post" ref={ titleRef } /><br/>
          <label>Body:</label><input  placeholder="Ex: This is a test post" ref={ bodyRef }  />

          <button type="submit">Add Post</button>
        </form>
        { state  }
      </div>
    );
  }