import React from 'react';
import "../styles/Playlist.css";

const Playlist = ({playlist}) => {
    return (
        <div className="playlist">

            <img src={playlist.images[0].url} alt=""/>
            
            <div className="playlist-info">
                <h1>{playlist.name}</h1>  
            </div>

        </div>
    );
}

export default Playlist;
