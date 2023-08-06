import { useEffect, useRef, useState } from 'react';
import GetAllPosts from './graphql/posts/getAllPosts';
import CreatePost from './graphql/posts/createPost';

export default function App() {
  const [ postLimit, setPostLimit ] = useState();
  const [ state, setState ] = useState(null)
  const inputRef = useRef();
  


  return (
    <div>
      <h2>All posts</h2>           
      <input onChange={ ( event )=> setPostLimit( event.target.value )} placeholder="Enter number of post" ref={ inputRef }/>
      <button onClick={ ()=>setState( <GetAllPosts postLimit={ Number( postLimit ) } />) }>Submit</button>
      <h2>Add new Post</h2>      
      <CreatePost /><br />
      { state }
    </div>
  )}