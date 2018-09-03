import React from 'react';

import './Person.css';


// function Blog (props ){
//     return (
//       <div className="blog">
//         <h1>{props.title}</h1>
//         <p>{props.description}</p>
//       </div>
//     );
//   }

const person = (props) => {
    return (
      <div className="Person" >
        <h1>Person</h1>
        <h2>name:{props.title}</h2>
        <p>Description:{props.description}</p>
        <p onClick={props.click} >Age: {Math.floor( Math.random() *30 ) } </p>
        <p><strong>{props.children}</strong></p>
        <input type="text" onChange={props.changed} value={props.title} />
      </div>
    );
  }

  export default person;