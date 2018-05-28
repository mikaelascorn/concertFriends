import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import firebase, { auth, provider } from 'firebase';
import ShowItem from './ShowItem';
import JournalItem from './JournalItem';

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
      imageArtist: '',
      postedName: '',
      loggedIn: false,
      displayName: '',
      artistSeen: '',
      seenDate: '',
      seenLocation: '',
      seenMemory: '',
      artistsSeen: [],
      userId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUpcoming = this.handleSubmitUpcoming.bind(this);
    this.handleSubmitJournal = this.handleSubmitJournal.bind(this);
    this.logout = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.removeJournal = this.removeJournal.bind(this);
  }

  loginWithGoogle() {
    console.log('clicked');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // grab info from user here 
        const user = result.user.displayName;
        const userId = result.user.uid;
        // console.log(result.user.displayName);
        this.setState({
          displayName: user,
          userId: userId
        })
      })
      // this will catch an error, its a promise method
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    firebase.auth().signOut();
    //turn the listener off and on
    // this.dbRef.off('value');
    // console.log('signed out!');
    this.setState({
      allShows: [],
      userId: '',
      displayName: '',
      loggedIn: false,
      artistsSeen: []
    });
  }

  // check on load if there is a user logged in already, if so set the states accordingly
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in');
        // console.log(user);
        this.setState({
          loggedIn: true,
          displayName: user.displayName,
          userId: user.uid,
        })
      } else {
        console.log('no users logged in');
      }
    });
  }

  // Checking if we already have the users information from firebase
  componentDidMount() {
    // this.dbRef = firebase.database().ref(`users/`);
    // this method gets a user passed, if theres a user
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user !== null) {
        firebase.database().ref(`users/${this.state.userId}`)
          // console.log(user);
          // theres no data for the user to get, we need to allow them to get the access to the data when they login
          .on('value', (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            const journalArray = [];

            for (let item in data) {
              data[item].key = item;

              journalArray.push(data[item])
              console.log(journalArray);
            }
            this.setState({
              artistsSeen: journalArray
            })
          })
        this.setState({
          loggedIn: true,
        })
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

  handleSubmitUpcoming(e) {
    e.preventDefault();
    this.setState({
      allShows: [],
      artistName: ''
    })
    let theArtist = ''
    theArtist = this.state.artistName;
    console.log(theArtist);
    axios({
      url: `https://rest.bandsintown.com/artists/${theArtist}/`,
      params: {
        app_id: `6e7ce2bb9f77b677bc181759630ddcf4`
      }
    }) 
    .then((res) => {
      console.log(res.data);
      this.setState({
        imageArtist: res.data.image_url,
        postedName: res.data.name,
      })      
    }) 
    axios({
      url: `https://rest.bandsintown.com/artists/${theArtist}/events/`,
      params: {
        app_id: `6e7ce2bb9f77b677bc181759630ddcf4`
      }
    })
    .then((res) => {
      // console.log('yes');
      console.log(res.data);
      let allShowsClone = Array.from(this.state.allShows);
      allShowsClone.push(res.data);
      this.topShows(allShowsClone);
    }) 
  }

  topShows(allShowsClone) {
    if ( allShowsClone => [1] ) {
      let finalShows = allShowsClone[0].slice(0, 5);
      console.log(finalShows);
      this.dateToString(finalShows)
      this.setState({
        allShows: finalShows
      })
    } else {
      console.log('hey');
    }
  }

  // dont set state in top shows 
  dateToString(finalShows) {
    for (let index = 0; index < finalShows.length; ++index) {
      const sliceTime = finalShows[index].datetime.slice(11);
      // console.log(sliceTime);
      const sliceDate = finalShows[index].datetime.slice(0, 10);
      // console.log(sliceDate);
      const sliceDay = sliceDate.slice(8, 10);
      // console.log(sliceDay);
      const sliceMonth = sliceDate.slice(5, 7);
      // console.log(sliceMonth);
      const sliceYear = sliceDate.slice(0, 4);
      // console.log(sliceYear);
      
      let finalDate = {
        month: sliceMonth,
        day: sliceDay,
        year: sliceYear,
        time: sliceTime
      }
      console.log(finalDate);
      // finalShows.push(finalDate)
    }
    return 
    // allShows.push(finalDate)
    // this.setState({
    //   allShows: finalShows
    // })
    // Then we can use that to set state and display the date we want
  }

  handleSubmitJournal(e) {
    e.preventDefault();
    const userSeen = {
      artist: this.state.artistSeen,
      date: this.state.seenDate,
      location: this.state.seenLocation,
      memory: this.state.seenMemory
    }
    const dbRef = firebase.database().ref(`users/${this.state.userId}`);
    dbRef.push(userSeen);
    console.log(dbRef);

    this.setState({
      artistSeen: '',
      seenDate: '',
      seenLocation: '',
      seenMemory: '',
    })
  }

  removeJournal(journalToRemove) {
    console.log('hi');
    firebase.database().ref(`users/${this.state.userId}/${journalToRemove}`).remove();
  }

  render() {
    return (
      <div>
        <div>
          <h1>I Heart Concerts</h1>
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

// Friday Beta
// 1 - To do list updates - who they have seen 
// 2 - See upcoming concerts of the artist they choose on the screen
// 3 - Search the API - CHECKED
// 4 - Login with Google/ Firebase CHECKED

// MVP - weekend
// Router! 

// Nice to have 
// Shift from a concert to a wish list? So save upcoming concerts you want to see
  // search without events
  // image_url  - full size image
  // thumb_url - tiny version image
