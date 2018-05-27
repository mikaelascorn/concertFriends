import React from 'react';

const JournalItem = (props) => {
  return(
    <li>
      <p>{props.artist}</p>
      <p>{props.date}</p>
      <p>{props.location}</p>
      <p>{props.memory}</p>
    </li>
  )
}
  
export default JournalItem;
