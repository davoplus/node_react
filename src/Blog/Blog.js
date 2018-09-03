import React from 'react';

import './Blog.css';

const blog = (props) => {
    return (
      <div className="Blog" >
        <h1>Blog</h1>
        <h2>Title:{props.title}({props.blogId})</h2>
        <p onClick={props.click}>Description:{props.description}</p> 
        <button onClick={e => props.openUpdateModal(e,props)}>Update Blog</button>       
        <button onClick={e => props.deleteBlog(e,props.blogId)}>Delete</button>
      </div>
    );
  }

  export default blog;