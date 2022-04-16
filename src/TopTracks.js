import React, { Component } from 'react';

class Toptracks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div>   
                <h4>Here are {this.props.userInfo.display_name}'s top tracks.</h4>
                <h6>{renderTopTracks(this.props.topTracks)}</h6> 
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
