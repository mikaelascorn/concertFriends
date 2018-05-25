import React from 'react';

const ShowItem = (props) => {
  return(
    <li>
      <p>{/* {props.image} */}</p>
      <p>{props.artist}</p>
      <p>{props.date}</p>
      <p>{props.venue}</p>
      <p>{props.city}</p>
      <p>{props.description}</p>
      <p>{props.url}</p>
    </li>




  )

}

export default ShowItem;