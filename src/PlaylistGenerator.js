import React from 'react';
import {useEffect, useState, useRef} from "react";
import './PlaylistGenerator.css';
import Track from './Track.js';

const Playlistgenerator = ({spotify}) => {

    spotify.setAccessToken(window.localStorage.getItem("token"));

    const [playlist, setPlaylist] = useState(null);
    const [playlistID, setPlaylistID] = useState(null);
    const [playlistName, setPlaylistName] = useState("");
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [userParams, setUserParams] = useState([]);
    const [addPlaylist, setAddPlaylist] = useState(false);
    const didMountPlaylist = useRef(false);
    const didMountPlaylistID = useRef(false);

    useEffect(() => {
        if(didMountPlaylist.current) {
            createPlaylist(); 
        } else {
            didMountPlaylist.current = true;
        }
        
    }, [playlist])

    useEffect(() => {
        if(didMountPlaylistID.current) {
            addTracksToPlaylist(); 
        } else {
            didMountPlaylistID.current = true;
        }
        
    }, [playlistID])

    const getTracksForPlaylist = async () => {
     
        if( addPlaylist && playlistName.length === 0) {
            alert("No playlist name.");
            return;
        }

        if( (artists.length + tracks.length + genres.length) === 0) {
            alert("No Artist/Genre/Track selected.");
            return;
        }

        await spotify.getRecommendations({  seed_tracks: tracks,
                                            seed_artists: artists,
                                            seed_genres: genres})
        .then(function(data) {
            let recommendations = data.body;
            setPlaylist(recommendations);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }

    const createPlaylist = async () => {

        // Create and add songs to playlist if wanted.
        if(!addPlaylist) return;
        
        await spotify.createPlaylist(playlistName, { 'description': 'My description', 'public': true })
        .then(function(data) {
            console.log('Created playlist!');
            setPlaylistID(data.body.id);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    const addTracksToPlaylist = async () => {
        var tracksToAdd = playlist.tracks.map((track) => "spotify:track:" + track.id);

        await spotify.addTracksToPlaylist(playlistID, tracksToAdd)
        .then(function(data) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    const renderPlaylist = () => {
        if(playlist) {
            return playlist.tracks.map(track => (
                <button key={track.id} onClick={() => playTrack(track.id)}>
                    <Track track={track}></Track>
                </button>
            ))
        } else {
            return <div></div>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(document.getElementById("agtParam").value.length === 0) {
            alert("Please enter an Artist/Genre/Track.");
            return;
        }
        checkAGT(document.getElementById("agtParam").value, document.getElementById("agtType").value);
    }

    const checkAGT = (agt, type) => {
       
        if( (artists.length + tracks.length + genres.length) >= 5 ) {
            alert("Limit Reached.");
            return;
        }

        if(type === "track") {
            spotify.searchTracks(`track:${agt}`)
            .then(function(data) {
                if(data.body.tracks.items[0]) {
                    var updatedTracks = [...tracks].concat(data.body.tracks.items[0].id);
                    var updatedUserParams = [...userParams].concat(data.body.tracks.items[0].name);
                    setTracks(updatedTracks);
                    setUserParams(updatedUserParams);
                } else {
                    alert("Track: " + agt + " was not found. Please enter a different Track.");
                }
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }

        if(type === "artist") {
            spotify.searchArtists(`artist:${agt}`)
            .then(function(data) {
                if(data.body.artists.items[0]) {
                    var updatedArtists = [...artists].concat(data.body.artists.items[0].id);
                    var updatedUserParams = [...userParams].concat(data.body.artists.items[0].name);
                    setArtists(updatedArtists);
                    setUserParams(updatedUserParams);
                } else {
                    alert("Artist: " + agt + " was not found. Please enter a different Artist.");
                }
            }, function(err) {
                console.error(err);
            });
        }

        if(type === "genre") {
            spotify.getAvailableGenreSeeds()
            .then(function(data) {
                if(data.body.genres.includes(agt)) {
                    var updatedGenres = [...genres].concat(agt);
                    var updatedUserParams = [...userParams].concat(agt);
                    setGenres(updatedGenres);
                    setUserParams(updatedUserParams);
                } else {
                    alert("Genre: " + agt + " was not found. Please enter a different Genre.");
                }
            }, function(err) {
                console.error(err);
            });
        }
    }

    const clearCurrentSelection = () => {
        setArtists([]);
        setGenres([]);
        setTracks([]);
        setUserParams([]);
    }

    const playTrack = async (id) => {
        await spotify.addToQueue("spotify:track:" + id)
        .then(function(data) {
            // console.log(data);
        }, function(err) {
            console.log('Something went wrong!', err);
            alert("No active device.");
        });

        await spotify.skipToNext()
        .then(function() {
            // console.log('Skip to next');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }


    return (
        <div className="generate-playlist-container">
                <h3>Welcome to the Playlist Generator.</h3>

                <h5>Please enter your playlist's name.</h5>
                <form>
                    <input type="text" onChange={e => setPlaylistName(e.target.value)}/>
                </form>

                <h5>Please enter your Artist/Genre/Track (Limit: 5).</h5>
                <form onSubmit={handleSubmit}>
                    <select name="agtType" id="agtType">
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                        <option value="track">Track</option>
                    </select>  
                    <input type="text" id="agtParam"/>
                    <button type="submit">Add</button>
                    <button className="clear-btn" type="button" onClick={() => clearCurrentSelection()}>Clear All</button>
                </form>

                <h6>Current Selection: </h6>
                <h6>{userParams.map(agt => (<div key={Math.random()}> {agt} </div>))}</h6>

                <div>
                    <button className="generate-btn" onClick={() => getTracksForPlaylist()}>Generate</button>
                    <button onClick={() => setAddPlaylist(!addPlaylist)}>{addPlaylist ? <p>Add Playlist</p>: <p>Don't Add Playlist</p>}</button>
                </div>

                <div className='generated-playlist-container'>{renderPlaylist()}</div>
            </div> 
    );
}

export default Playlistgenerator;
