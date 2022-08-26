import React from 'react';
import {useEffect, useState} from "react";

const ProfileOverview = ({spotify}) => {

    spotify.setAccessToken(window.localStorage.getItem("token"));

    const [topTracks, setTopTracks] = useState([]);
    const [topTrackIds, setTopTrackIds] = useState(null);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        
        /* Get a User’s Top Tracks*/
        spotify.getMyTopTracks("time_range=long_term")
            .then(function(data) {
                const topTracks = data.body.items;
                const topTrackIds = [];
                topTracks.map((track) => topTrackIds.push(track.id));
                setTopTrackIds(topTrackIds);
                setTopTracks(topTracks);
            }, function(err) {
                console.log('Something went wrong!', err);
        });
    }, [])

    useEffect (() => {
        if(topTrackIds === null) return;
        spotify.getMe()
            .then(function(data) {
                setUserInfo(data.body); 
            }, function(err) {
                console.log('Something went wrong!', err);
        });
    }, [topTrackIds]);

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
