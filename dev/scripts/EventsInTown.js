import React from 'react';
import axios from 'axios';

class EventsInTown extends React.Component{
    handleSubmitForm() {

    }
    handleSubmit(event) {
        event.preventDefault();
    }
    componentDidMount() {
        const theArtist = "Drake"
        axios({
            url: `https://rest.bandsintown.com/artists/${theArtist}/events/`,
            params: {
                app_id: `6e7ce2bb9f77b677bc181759630ddcf4`
            }
        })
        .then((res) => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={() => this.handleSubmitForm()}>
                    <input type="text"/>
                    <button onSubmit={() => this.handleSubmit()}></button>
                </form>
            </div>
        )
    }
}

export default EventsInTown;