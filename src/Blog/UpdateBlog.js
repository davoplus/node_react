import React from 'react';

import './Blog.css';

const updateBlog = (props) => {
    return (
      <div className="Blog" >
        <h1>Update Blog</h1>
        <h2>Title:</h2>
        <input type="text" name="newBlogTitle" onChange={props.titleChange} value={props.title}/>
        <h2>Description:</h2>
        <input type="text"name="newBlogDescription" onChange={props.descriptionChange} value={props.description}/>
        <button onClick={e => props.click(e,props.blogId)}>Save</button>
      </div>
    );
  }

  export default updateBlog;