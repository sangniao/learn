import React, { useState , useRef, useEffect } from 'react'
import { UPDATE_POST } from './mutations'
import { useMutation  } from '@apollo/client';
import DeletePost from './deletePost';


export default function UpdatePost({ post , item }) {

    const [ title, setTitle] = useState( post.title);
    const [ body, setBody ] = useState( post.body);
    const [ state, setState ] = useState('');
    const titleRef = useRef();
    const bodyRef = useRef();
    

    const [ updatePost, { data, loading, error  } ] = useMutation( UPDATE_POST );

    
    const setAllState = ( message )=>{ 
      titleRef.current.value = ''
      bodyRef.current.value = '';   
      setTitle('');
      setBody('');       
      setState(message)
    }

    useEffect(()=>{
      if( data ){        
        setState("The Post Updated")
      }
      
    },[ data ])


    useEffect(()=>{

    if( post ){            
       const { title, body } = post;
       
       setTitle( title );
       setBody( body );
  
     }
     
  }, [ post ]);

   
    
  
  const props = {
    post,
    setAllState,
    item
  }


  const handleSubmit = (e)=>{ 
      e.preventDefault();
      
      updatePost({ 
          variables: { 
              id: post.id,
              input: {  title , body } 
      }});

     
      setAllState(); //reseting states and input fields
  }
  
 //place these return statements after useEffect. 
 //Otherwise there will be an runtime error when submitting the form
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  
  return (    
    <div>
        <h2>Edit Posts</h2>
        { state }
        <div style={ { display: "flex"}}>
            <form onSubmit={ handleSubmit } >

              <input onChange={e => setTitle(e.target.value)} 
                value={ title } ref={ titleRef } />

              <input onChange={e => setBody(e.target.value)} 
              value={ body } ref={ bodyRef }  />

              <button type="submit">Update</button>          
            </form>
            <DeletePost {...props }  />
           
        </div>

    
    </div>
  )
}