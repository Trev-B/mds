import React, { Component } from 'react';

class Toptracks extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    
    setVisible() {
        this.setState({ visible: !this.state.visible});
    }

    render() {
        return (
            <div>
                
                <button onClick={() => this.setVisible()}>Show Top Tracks</button>
                {this.state.visible ?
                    <div>
                        <h1>Here are your top tracks.</h1>
                        <h2>{renderTopTracks(this.props.topTracks)}</h2> 
                    </div> :
                    <div></div>
                }

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
