import React from 'react';

const ShowItem = (props) => {
  return(
    <li className="showItems" >
      <p className="showDate showItem">Date of Concert: {props.date}</p>
      <p className="showVenue showItem">Concert Venue: {props.venue}</p>
      <p className="showCity showItem">City of Concert: {props.city}</p>
      <a className="showTickets showItem" href={props.url}>Buy Tickets!</a>
    </li>
  )
}

export default ShowItem;