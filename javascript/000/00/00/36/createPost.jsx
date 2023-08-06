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
          setState( `${ id }  ${ title }  ${ body }`  );
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
          <input  ref={ titleRef } />
          <input  ref={ bodyRef }  />

          <button type="submit">Add Post</button>
        </form>
        { state  }
      </div>
    );
  }