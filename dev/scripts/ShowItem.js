import React from 'react';

const ShowItem = (props) => {
  return(
    <li>
      <p>{/* {props.image} */}</p>
      <p>{props.date}</p>
      <p>{props.venue}</p>
      <p>{props.city}</p>
      <p>{props.description}</p>
      <a href={props.url}>Buy Tickets!</a>
    </li>




  )

}

export default ShowItem;