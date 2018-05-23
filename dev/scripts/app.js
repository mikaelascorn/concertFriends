import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

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
          <form onSubmit={()=>this.onSubmit()}>
            <input  type="text"/>
            <button onClick = {() => this.handleSubmit()}></button>
          </form>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
