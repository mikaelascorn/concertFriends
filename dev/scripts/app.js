import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, browserHistory } from "react-router-dom";
// import firebase, { auth, provider } from 'firebase';
import ShowItem from './ShowItem';
import JournalItem from './JournalItem';
import Homepage from './Homepage';
import WelcomePage from './WelcomePage';


class App extends React.Component {
  
  // constructor() {
  //   super();
  //   this.state = {
  //     artistName: '',
  //     allShows: [],
  //     imageArtist: '',
  //     postedName: '',
  //     loggedIn: false,
  //     displayName: '',
  //     artistSeen: '',
  //     seenDate: '',
  //     seenLocation: '',
  //     seenMemory: '',
  //     artistsSeen: [],
  //     userId: ''
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmitUpcoming = this.handleSubmitUpcoming.bind(this);
  //   this.handleSubmitJournal = this.handleSubmitJournal.bind(this);
  //   this.logout = this.logout.bind(this);
  //   this.loginWithGoogle = this.loginWithGoogle.bind(this);
  //   this.removeJournal = this.removeJournal.bind(this);
  // }
  
  render() {
    return(
      <Router history={browserHistory}>
        <div className="welcome">
          <Route exact path="/" render={ (props) => <WelcomePage 
          router={props}/>}>
          </Route>
          <Route path='/Homepage' component={Homepage} />
          <Link to="/home">Log in!</Link>
        </div>  
      </Router>
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
