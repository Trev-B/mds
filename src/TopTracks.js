import React, { Component } from 'react';

class Toptracks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div>   
                <h1>Here are your top tracks.</h1>
                <h2>{renderTopTracks(this.props.topTracks)}</h2> 
            </div> 
        );
    }
}

const renderTopTracks = (topTracks) => {
    return topTracks.map(track => (
        <div key={track.id}>
            {track.name}
        </div>
    ))
}

export default Toptracks;
