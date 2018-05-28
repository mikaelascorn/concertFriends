import React from 'react';

const JournalItem = (props) => {
  return (
    <li className="searchBandItems" >
      <p>Artist Name: {props.artist}</p>
      <p>Date: {props.date}</p>
      <p>Location: {props.location}</p>
      <p>Memories from the Concert</p>
      <p>{props.memory}</p>
      <button onClick={() => props.removeJournal(props.firebaseKey)}>Remove</button>
    </li>
  )
}

export default JournalItem;