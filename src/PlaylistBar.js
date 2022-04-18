import React from 'react';
import {useEffect, useState} from "react";
import AnalyzePlaylist from './AnalyzePlaylist';
import './PlaylistBar.css';

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


    return (
        <div className="playlist-bar-container">
            
            <div className="user-playlists">
                <div className="user-playlists-header">
                    <h6>Playlists</h6>
                    <hr></hr>
                </div>
                {userPlaylists.items.map(playlist =>(  <div className="user-playlist" key={playlist.id}>
                                                            <button onClick= {() => handlePlaylistClick(playlist)} key={playlist.id}>
                                                                    {playlist.images.length ? <img width={"100%"} src={playlist.images[0].url} alt=""/> : <div>No Image</div>}
                                                                    {playlist.name}  
                                                            </button>
                                                        </div>
                                                    ))}
            </div>

            {selectedPlaylistTracks.length !== 0 ?
            <div className="selected-playlist">
                <div className="selected-playlist-header"> 
                    <h6>{selectedPlaylist.name}</h6>
                    <hr></hr>
                </div>
                {selectedPlaylistTracks.map(track =>(   <div key={track.track.id}>
                                                            <p className="selected-playlist-tracks" key={track.track.id}>
                                                                {track.track.name}
                                                            </p>
                                                            <hr></hr>
                                                        </div>
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
