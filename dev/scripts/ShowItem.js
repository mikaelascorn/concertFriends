import React from 'react';

const ShowItem = (props) => {
  return(
    <li className="showItems" >
      <p className="showDate showItem">Date of Concert:</p>
      <p className="showDate showItem">{props.date}</p>
      <p className="showVenue showItem">Concert Venue:</p>
      <p className="showVenue showItem">{props.venue}</p>
      <p className="showCity showItem">City of Concert:</p>
      <p className="showCity showItem">{props.city}</p>
      <a className="showTickets showItem" href={props.url}>Buy Tickets!</a>
    </li>
  )
}

export default ShowItem;