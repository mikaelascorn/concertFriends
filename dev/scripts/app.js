import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import EventsInTown from './EventsInTown';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      artistName: '',
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    console.log(e);
    
    this.setState({
      // value: event.target.value
      [e.target.name]: e.target.value
    })

    // store the value as theArtist
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit is running!');




    // this.setState({
    //   artistName: ''
    // })
  }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input required type="text" name="artistName" value={this.state.artistName} onChange={this.handleChange}  />
            {/* <select name="" id="">
              <option value=""></option>
              <option value=""></option>
            </select> */}
            <input type="submit" value="submit" />
          <EventsInTown />
          </form>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
