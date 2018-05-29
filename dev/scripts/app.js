import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, browserHistory } from "react-router-dom";
import ShowItem from './ShowItem';
import JournalItem from './JournalItem';
import Homepage from './Homepage';
import WelcomePage from './WelcomePage';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <div>
          <h1>I
            <img src="/public/hand-blue.svg" alt="hand making the rock-on gesture"/>
          Concerts</h1>
          <h2>One place to search for upcoming concerts by your favourite artists and keep a journal of memories from past concerts you've attended!</h2>
          {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>}
          {this.state.loggedIn === true ? <button onClick={this.logout}>Logout</button> : null}
        </div>
        <div>
          <h2>Hi, {this.state.displayName}</h2>
        </div>
        <form onSubmit={this.handleSubmitUpcoming}>
          <input required type="text" name="artistName" value={this.state.artistName} onChange={this.handleChange} placeholder="Artist" />
          {/* <select name="" id="">
            <option value=""></option>
            <option value=""></option>
          </select> */}
          <input type="submit" value="Artist Search" />
          <div>
            <h3>{this.state.postedName}</h3>
            <img src={this.state.imageArtist} alt=""/>
          </div>
          <h2>Upcoming Concerts</h2>
          <ul>
            {this.state.allShows.map((showItem, i) => {
              //How many results do we want to show?
              return <ShowItem
                key={i}
                venue={showItem.venue.name} //Check 2-level-deep labels -ok?
                city={showItem.venue.city}
                date={showItem.datetime}
                description={showItem.description}
                url={showItem.offers[0].url}
              />
            })}
          </ul>
        </form>
        <form onSubmit={this.handleSubmitJournal}>
          <input type="text" name="artistSeen" value={this.state.artistSeen} onChange={this.handleChange} />
          <label id="artistsSeen" htmlFor="artist">Artist Name</label>

          <input type="text" name="seenDate" value={this.state.seenDate} onChange={this.handleChange} />
          <label id="seenDate" htmlFor="date">Date of the Concert</label>

          <input type="text" name="seenLocation" value={this.state.seenLocation} onChange={this.handleChange} />
          <label htmlFor="location">Location of the Concert</label>

          <textarea name="" id="" cols="10" rows="10" name="seenMemory" value={this.state.seenMemory} onChange={this.handleChange}></textarea>
          <label htmlFor="memory">A memory from the Concert</label>

          <input type="submit" value="Add Entry" />
          <h2>Artists {this.state.displayName} has seen in concert!</h2>
          <ul>
            {this.state.artistsSeen.map((journal) => {
              return <JournalItem
                key={journal.key}
                firebaseKey={journal.key}
                removeJournal={this.removeJournal}
                artist={journal.artist}
                date={journal.date}
                location={journal.location}
                memory={journal.memory}
              />
            })}
          </ul>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

