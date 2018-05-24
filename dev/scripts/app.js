import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
// import EventsInTown from './EventsInTown';

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
      [e.target.name]: e.target.value
    });

  }
  handleSubmit(e) {
    e.preventDefault();
    let theArtist = ''
    theArtist = this.state.artistName;
    console.log(theArtist);
    // console.log('the artist');

    // componentDidMount() {

      // this.state.props.artistName
      // let theArtist = ''
      // theArtist = this.state.artistName;
      // console.log(theArtist);
      // console.log('the artist');
      axios({
        url: `https://rest.bandsintown.com/artists/${theArtist}/events/`,
        params: {
          app_id: `6e7ce2bb9f77b677bc181759630ddcf4`
        }
      })
        .then((res) => {
          console.log('yes');
          console.log(res)
        });
    // }
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
          <input type="submit" value="Artist Search" />
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
