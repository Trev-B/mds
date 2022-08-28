import React from 'react';
import "../styles/Track.css";

const Track = ({track}) => {
    return (
        <div className="track">
            
            <img src={track.album.images[0].url} alt=""/> 
           
            <div className="track-info">
                <h1>{track.name}</h1>
                <p>{track.artists[0].name}</p> 
            </div>
            
        </div>
    );
}

export default Track;
