import React from 'react';

import './Blog.css';

const newBlog = (props) => {
    return (
      <div className="Blog" >
        <h1>New Blog</h1>
        <h2>Title:</h2>
        <input type="text" name="newBlogTitle" onChange={props.titleChange}/>
        <h2>Description:</h2>
        <input type="text"name="newBlogDescription" onChange={props.descriptionChange}/>
        <button onClick={e => props.click(e,props)}>Save</button>
      </div>
    );
  }

  export default newBlog;