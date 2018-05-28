import React from 'react';

const ShowItem = (props) => {
  return(
    <li>
      <p>Date of Concert: {props.date}</p>
      <p>Concert Venue: {props.venue}</p>
      <p>City of Concert: {props.city}</p>
      <a href={props.url}>Buy Tickets!</a>
    </li>
  )
}

export default ShowItem;