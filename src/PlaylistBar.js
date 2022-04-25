import React from 'react';
import {useEffect, useState} from "react";
import AnalyzePlaylist from './AnalyzePlaylist';
import './PlaylistBar.css';
import Track from './Track';
import Playlist from './Playlist';

const Playlistbar = ({spotify, userInfo}) => {

    spotify.setAccessToken(window.localStorage.getItem("token"));

    const [userPlaylists, setUserPlaylists] = useState({items: []});
    const [selectedPlaylist, setSelectedPlaylist] = useState({})
    const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);

    useEffect(() => {
        
        getPlaylists();
        
    }, [])

    const getPlaylists = async () => {
        spotify.getUserPlaylists()
            .then(function(data) {     
                setUserPlaylists(data.body)              
                //console.log('Retrieved playlists', data.body);
            },function(err) {
                console.log('Something went wrong!', err);
        });
    } 

    const handlePlaylistClick = async (playlist) => {
        setSelectedPlaylist(playlist);

        await spotify.getPlaylist(playlist.id)
            .then(function(data) {
                //console.log('Some information about this playlist', data.body.tracks.items);
                setSelectedPlaylistTracks(data.body.tracks.items)
        }, function(err) {
                console.log('Something went wrong!', err);
        });

    }

    const playTrack = async (id) => {
        await spotify.addToQueue("spotify:track:" + id)
            .then(function(data) {
                // console.log(data);
        }, function(err) {
                alert("No active device.");
                console.log('Something went wrong!', err);
        });

        await spotify.skipToNext()
            .then(function() {
                // console.log('Skip to next');
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    }


    return (
        <div className="playlist-bar-container">
            
            <div className="user-playlists">
                <div className="user-playlists-header">
                    <h6>Playlists</h6>
                    <hr></hr>
                </div>
                {userPlaylists.items.map(playlist =>(  <button className="playlist-btn" onClick= {() => handlePlaylistClick(playlist)} key={playlist.id}>   
                                                            <Playlist playlist={playlist}></Playlist>   
                                                        </button>    
                                                    ))}
            </div>

            {selectedPlaylistTracks.length !== 0 ?
            <div className="selected-playlist">
                <div className="selected-playlist-header"> 
                    <h6>{selectedPlaylist.name}</h6>
                    <hr></hr>
                </div>
                {selectedPlaylistTracks.map(track =>(   <button className="playlist-btn" onClick= {() => playTrack(track.track.id)} key={track.track.id}>
                                                            <Track track={track.track}></Track>
                                                        </button>
                                                    ))}
            </div>

            : <div/>}

            {selectedPlaylistTracks.length !== 0 ?                   
            <div className="analyze-playlist-flex">
                <AnalyzePlaylist playlist={selectedPlaylistTracks}></AnalyzePlaylist>
            </div>   

            : <div/>}

        </div>
    );
}

export default Playlistbar;
