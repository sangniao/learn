import React, { useEffect, useRef, useState } from 'react'
import { useQuery , useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS , GET_POST } from './queries';
import UpdatePost from './updatePost';

export default function getAllPosts({ postLimit}) {
    
    
const [ updatePost , setUpdatePost ] = useState('');
const listItemRef = useRef([]); 
const { loading, error, data } = useQuery( GET_ALL_POSTS , { variables: { limit: postLimit }});
const [ getPost,   post  ] = useLazyQuery( GET_POST ); 

  


    useEffect(()=>{       

        if( post.data ){        
            setUpdatePost(<UpdatePost post={ post.data.post } item={ listItemRef }/>);        
        }

      },[ post.data ])

    
    
    //place these return statements after useEffect. 
    //Otherwise there will be an runtime error when submitting the form
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
    <div>
    { data.posts.data.map( post => 
        <li ref={  el =>listItemRef.current[ post.id ]  = el } key={ post.id }>
                <a href='#' onClick={ ()=>getPost ( { variables: { id : post.id }}) }>{ post.title  }</a>
        </li>) }  
        { updatePost }
       </div>
)}