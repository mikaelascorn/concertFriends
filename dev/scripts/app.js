import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class App extends React.Component {

  getUrl() {
    
  }
  
  handleSubmit(event) {
    // call get URL
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
          hi
        </div>
        // <input  type="text"/>
        // <button onClick = {() => this.getUrl()}></button>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
