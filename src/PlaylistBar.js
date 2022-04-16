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
        spotify.getUserPlaylists(userInfo.display_name)
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
                <p>Playlists</p>
                {userPlaylists.items.map(playlist =>(  <button onClick= {() => handlePlaylistClick(playlist)} key={playlist.id}>
                                                            <div className="user-playlists-names" >
                                                                {playlist.images.length ? <img width={"100%"} src={playlist.images[0].url} alt=""/> : <div>No Image</div>}
                                                                {playlist.name}
                                                            </div>
                                                        </button>
                                                    ))}
            </div>

            <div className="analyze-playlist-content">
                <div className="selected-playlist">
                    <h3>{selectedPlaylist.name}</h3>
                    {selectedPlaylistTracks.map(track =>(   <p className="selected-playlist-tracks" key={track.track.id}>
                                                                {track.track.name}
                                                            </p>
                                                        ))}
                </div>

                <div className="analyze-playlist">
                    <AnalyzePlaylist playlist={selectedPlaylistTracks}></AnalyzePlaylist>
                </div>
            </div>
                                            
        </div>
    );
}

export default Playlistbar;
