import React, { Component } from 'react';

class PlaylistParams extends Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    render() {
        return (
            <div>
               <select name="agt" id="agt">
                    <option value="artist">Artist</option>
                    <option value="genre">Genre</option>
                    <option value="track">Track</option>
                </select>  
                <input type="text" onChange={e => this.props.data.setUserParams(e.target.value, document.getElementById("agt").value)}/>
            </div>
        );
    }
}

export default PlaylistParams;
