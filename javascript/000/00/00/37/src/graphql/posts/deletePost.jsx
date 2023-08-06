import React, {  useEffect } from 'react'
import {  DELETE_POST } from './mutations';
import { useMutation  } from '@apollo/client';

export default function deletePost({ post, setAllState , item }) {
    
    const [ deletePost, { data, loading , error } ] = useMutation( DELETE_POST);    

    useEffect(()=>{
        if( data ){
            setAllState( "Post deleted" )  
         }
         
      }, [ data ]);

    const handleDelete = ()=>{    
        deletePost( { variables : { id : post.id }})      
        item.current[ post.id ].remove();   
        setAllState(''); 
      
    }

    //place the return statement after useEffect. 
    //Otherwise there will be an runtime error when submitting the form
    if (loading) return 'Submitting...';
    if (error){
        setAllState( error.message); 
    }
   

  return (
    <div>
        <button onClick={ handleDelete } type="submit">Delete</button>
    </div>
  )
}