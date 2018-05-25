import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import firebase from 'firebase';
import ShowItem from './ShowItem';
// import EventsInTown from './EventsInTown';

var config = {
  apiKey: "AIzaSyBEqlA21ilIP2aDVHm6KhvprRhz6xkyG4k",
  authDomain: "iheartconcerts-80ab6.firebaseapp.com",
  databaseURL: "https://iheartconcerts-80ab6.firebaseio.com",
  projectId: "iheartconcerts-80ab6",
  storageBucket: "iheartconcerts-80ab6.appspot.com",
  messagingSenderId: "790151033211"
};
firebase.initializeApp(config);

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      artistName: '',
      allShows: [],
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  loginWithGoogle() {
    console.log('clicked');
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((user) => {
      console.log(user);
    })
    // this will catch an error, its a promise method
    .catch((err) => {
      console.log(err);
    })
  }

  logout() {
    firebase.auth().signOut();
    //turn the listener off and on
    this.dbRef.off('value');
    console.log('signed out!');
  }

  componentDidMount() {
    // setup the event listener, make reference to the 'todos' key in firebase
    this.dbRef = firebase.database().ref('IHeartConcerts');
    // this method gets a user passed, if theres a user
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        // theres no data for the user to get, we need to allow them to get the access to the data when they login
        this.dbRef.on('value', (snapshot) => {
          console.log(snapshot.val());
        });
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let theArtist = ''
    theArtist = this.state.artistName;
    axios({
      url: `https://rest.bandsintown.com/artists/${theArtist}/events/`,
      params: {
        app_id: `6e7ce2bb9f77b677bc181759630ddcf4`
      }
    })
    .then((res) => {
      console.log('yes');
      console.log(res.data);

      const allShowsClone = Array.from(this.state.allShows);
      allShowsClone.push(res.data);

      this.topShows(allShowsClone);

    })
  }

  topShows(allShowsClone) {
    const finalShows = allShowsClone[0].slice(0, 5);
    console.log(finalShows);
    this.setState({
      allShows: finalShows
    }) 
  }

  // Keep topShows as is, but dont set state in it 
    // convert the string to an array so we can use POP
    // Pass the info to a new method to break up date and time, first 10 characters and then last 8? 
    // use two new methods, one to play with each date and time, look like this:
  // let finalDate = {
        //   year:
        //   Day:
        //   month:
        //   time:
          // }

        // allShows.push(finalDate)
        // Then we can use that to set state and display the date we want

  render() {
    return (
      <div>
        <div>
          {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>}
          {this.state.loggedIn === true ? <button onClick={this.logout}>Logout</button> : null}
        </div>
        
        <form onSubmit={this.handleSubmit}>
          <input required type="text" name="artistName" value={this.state.artistName} onChange={this.handleChange} placeholder="Drake" />
          {/* <select name="" id="">
            <option value=""></option>
            <option value=""></option>
          </select> */}
          <input type="submit" value="Artist Search" />
          <h2>Upcoming Shows</h2>
            <ul>
              {this.state.allShows.map((showItem,i) => {
                //How many results do we want to show?
                return <ShowItem
                key={i}
                artist={showItem.artistName}
                // image=
                venue={showItem.venue.name} //Check 2-level-deep labels -ok?
                city={showItem.venue.city}
                date={showItem.datetime}
                description={showItem.description}
                ticketsLink={showItem.url}
                />
              })}
              </ul>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Friday Beta
// 1 - To do list updates - who they have seen 
// 2 - See upcoming concerts of the artist they choose on the screen
// 3 - Search the API 
// 4 - Login with Google/ Firebase 

// MVP - weekend
// Router! 

// Nice to have 
// Shift from a concert to a wish list? So save upcoming concerts you want to see
// Second API call to have photo artist info diplay on the page
  // search without events
  // image_url  - full size image
  // thumb_url - tiny version image

