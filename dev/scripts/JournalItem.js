import React from 'react';

const JournalItem = (props) => {
  return (
    <li className="searchBandItems" >
      <p className="searchBandName searchBandItem">Artist Name:</p>
      <p className="searchBandName searchBandItem">{props.artist}</p>
      <p className="searchBandDate searchBandItem">Date:</p>
      <p className="searchBandDate searchBandItem">{props.date}</p>
      <p className="searchBandLocation searchBandItem">Location:</p>
      <p className="searchBandLocation searchBandItem">{props.location}</p>
      <p className="searchBandMemories searchBandItem">Memories from the Concert</p>
      <p className="searchBandMemoriesText searchBandItem">{props.memory}</p>
      <button onClick={() => props.removeJournal(props.firebaseKey)}>Remove</button>
    </li>
  )
}

export default JournalItem;