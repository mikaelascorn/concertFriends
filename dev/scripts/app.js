import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
=======
import EventsInTown from './EventsInTown';
>>>>>>> c26e15ac649cece1db156aa029cb66fc5f7d3f5c

class App extends React.Component {
  
  handleSubmit() {

  }
  onSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    axios.get({
      url: `https://rest.bandsintown.com/artists/${artistname}`,
      params: {
        // artistname: Drake;
        app_id: `ceec010e4571387dbe8a3dabb1ee3e13`,
      }
    })
    
    //2 set up then for a promsie
    .then((res) => {
      console.log(res);
    })
  }
    render() {
      return (
        <div>
<<<<<<< HEAD
          <form onSubmit={()=>this.onSubmit()}>
            <input  type="text"/>
            <button onClick = {() => this.handleSubmit()}></button>
          </form>
=======
          <EventsInTown />
>>>>>>> c26e15ac649cece1db156aa029cb66fc5f7d3f5c
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
