import React from 'react';

const JournalItem = (props) => {
  return (
    <li className="searchBandItems" >
      <p className="searchBandName searchBandItem">Artist Name: {props.artist}</p>
      <p className="searchBandDate searchBandItem">Date: {props.date}</p>
      <p className="searchBandLocation searchBandItem">Location: {props.location}</p>
      <p className="searchBandMemories searchBandItem">Memories from the Concert:</p>
      <p className="searchBandMemoriesText searchBandItem">{props.memory}</p>
      <button onClick={() => props.removeJournal(props.firebaseKey)}>Remove</button>
    </li>
  )
}

export default JournalItem;