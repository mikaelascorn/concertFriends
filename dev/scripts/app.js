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
      loggedIn: false,
      displayName: '',
      artistSeen: '',
      seenDate: '',
      seenLocation: '',
      seenMemory: '',
      artistsSeen: [],
      // user: null,
      userId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUpcoming = this.handleSubmitUpcoming.bind(this);
    this.handleSubmitJournal = this.handleSubmitJournal.bind(this);
    this.logout = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    // this.topShows = this.topShows.bind(this);
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
      });
    })
    // this will catch an error, its a promise method
    .catch((err) => {
      console.log(err);
    });
  }

  logout() {
    firebase.auth().signOut();
    //turn the listener off and on
    this.dbRef.off('value');
    console.log('signed out!');
    this.setState({
      allShows: [],
      userId: ''
    });
  }

  componentDidMount() {
    // setup the event listener, make reference to the key in firebase
    this.dbRef = firebase.database().ref(`users/`);
    // this method gets a user passed, if theres a user
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user !== null) {
        // theres no data for the user to get, we need to allow them to get the access to the data when they login
        this.dbRef.on('value', (snapshot) => {
          // console.log(snapshot.val());
        });
        this.setState({
          loggedIn: true,
          displayName: user.displayName
        }, () => {
          // doing this to run this fuction after that set state
          const userInfo = {
            user: this.state.displayName,
            userId: this.state.userId
          }
          // sets firebase as general user ids per person
          firebase.database().ref('users/' + this.state.userId).set(userInfo);
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
    
    this.dateToString(finalShows)

    this.setState({
      allShows: finalShows
    }) 
  }
  // dont set state in top shows 
  dateToString(finalShows) {
    const sliceTime = finalShows[0].datetime.slice(11);
    console.log(sliceTime);

    const sliceDate = finalShows[0].datetime.slice(0, 10);
    console.log(sliceDate);
     
    const sliceDay = sliceDate.slice(8, 10);
    console.log(sliceDay);

    const sliceMonth = sliceDate.slice(5, 7);
    console.log(sliceMonth);

    const sliceYear = sliceDate.slice(0,4);
    console.log(sliceYear);

    let finalDate = {
      month: sliceMonth,
      day: sliceDay,
      year: sliceYear,
      time: sliceTime 
    }
    return 
    // finalShows.push(finalDate)
  }
  
      // allShows.push(finalDate)
      // Then we can use that to set state and display the date we want

  handleSubmitJournal(e) {
    e.preventDefault();
    const userSeen = {
      artist: this.state.artistSeen,
      date: this.state.seenDate,
      location: this.state.seenLocation,
      memory: this.state.seenMemory
    }
    // const dbRef = firebase.database().ref(`IHeartConcert/${this.state.user}`);
    dbRef.push(userSeen);
    this.setState({
      artistSeen: '',
      seenDate: '',
      seenLocation: '',
      seenMemory: ''
    })
  }

  render() {
    return (
      <div>
        <div>
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
        <form onSubmit={this.handleSubmitJournal}>
          <input type="text" name="artistSeen" value={this.state.artistSeen} onChange={this.handleChange}/>
          <input type="text" name="seenDate" value={this.state.seenDate} onChange={this.handleChange}/>
          <input type="text" name="seenLocation" value={this.state.seenLocation} onChange={this.handleChange}/>
          <textarea name="" id="" cols="30" rows="10" name="seenMemory" value={this.state.seenMemory} onChange={this.handleChange}></textarea>
          <input type="submit" value="Add Entry"/>
          <h2>Artists {this.state.displayName} has seen</h2>
              <ul>
                {this.state.artistsSeen.map((journal, i) => {
                  return <JournalItem
                  key={i}
                  artist={journal.artistSeen}
                  date={journal.seenDate}
                  location={journal.seenLocation}
                  memory={journal.seenMemory}
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
// Second API call to have photo artist info diplay on the page
  // search without events
  // image_url  - full size image
  // thumb_url - tiny version image

