import React from 'react';

const Remove = (props) => {
  // console.log(props);
  return (
    <li>
      <button className="remove" onClick={() => props.remove(props.firebaseKey)}>X</button>
      <p>{props.display}<span className="equals">=</span><span>{props.equation}</span></p>
    </li>
  )
};

export default Remove;