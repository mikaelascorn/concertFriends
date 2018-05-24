import React from 'react';

const ShowItem = (props) => {
  return(
    <li>
      <p>{/* {props.image} */}</p>
      <p>{props.artistName}</p>
      <p>{props.dateTime}</p>
      <p>{props.venue.name}</p>
      <p>{props.venue.city}</p>
      <p>{props.description}</p>
      <p>{props.url}</p>
    </li>




  )

}

export default ShowItem;