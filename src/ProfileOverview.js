import React from 'react';
import {useEffect, useState} from "react";

const ProfileOverview = ({spotify}) => {

    spotify.setAccessToken(window.localStorage.getItem("token"));

    const [topTracks, setTopTracks] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        
        /* Get a User’s Top Tracks*/
        spotify.getMyTopTracks("time_range=long_term")
            .then(function(data) {
                let topTracks = data.body.items;
                setTopTracks(topTracks);
            }, function(err) {
                console.log('Something went wrong!', err);
        });

        spotify.getMe()
            .then(function(data) {
                setUserInfo(data.body); 
            }, function(err) {
                console.log('Something went wrong!', err);
        });
        
    }, [])

    const renderTopTracks = (topTracks) => {
        return topTracks.map(track => (
            <div key={track.id}>
                {track.name}
            </div>
        ))
    }
    
    return (
        <div>
            <h4>Here are {userInfo.display_name}'s top tracks.</h4>
            <h6>{renderTopTracks(topTracks)}</h6> 
        </div>
    );
}

export default ProfileOverview;
