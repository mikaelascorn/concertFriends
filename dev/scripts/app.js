import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EventsInTown from './EventsInTown';

class App extends React.Component {
    render() {
      return (
        <div>
          <EventsInTown />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
