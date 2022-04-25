import React, { Component } from 'react';
import './GeneratePlaylist.css';
import Track from './Track.js';

class GeneratePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {  playlist: null, 
                        playlistID: null,
                        playlistName: "",
                        artists: [],
                        genres: [],
                        tracks: [],
                        userParams: [],
                        createPlaylist: false };
    }

    getTracksForPlaylist() {
        //this.props.spotify.setAccessToken(this.props.token);
        if( this.state.createPlaylist && this.state.playlistName.length === 0) {
            alert("No playlist name.");
            return;
        }

        if( (this.state.artists.length + this.state.tracks.length + this.state.genres.length) === 0) {
            alert("No Artist/Genre/Track selected.");
            return;
        }

        this.props.spotify.getRecommendations({
            seed_tracks: this.state.tracks,
            seed_artists: this.state.artists,
            seed_genres: this.state.genres
        })
        .then(function(data) {
        let recommendations = data.body;
        this.setState({playlist: recommendations}, () => this.createPlaylist());
        }.bind(this), function(err) {
        console.log("Something went wrong!", err);
        });
    }

    createPlaylist() {
        if(!this.state.createPlaylist) return;
        
        this.props.spotify.createPlaylist(this.state.playlistName, { 'description': 'My description', 'public': true })
        .then(function(data) {
            console.log('Created playlist!');
            this.setState({playlistID: data.body.id}, () => this.addTracksToPlaylist());
        }.bind(this), function(err) {
            console.log('Something went wrong!', err);
        });
    }

    addTracksToPlaylist() {
        var tracksToAdd = this.state.playlist.tracks.map((track) => "spotify:track:" + track.id);

        this.props.spotify.addTracksToPlaylist(this.state.playlistID, tracksToAdd)
        .then(function(data) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    renderPlaylist() {
        if(this.state.playlist) {
            return this.state.playlist.tracks.map(track => (
                <button key={track.id} onClick={() => this.playTrack(track.id)}>
                    <Track track={track}></Track>
                </button>
            ))
        } else {
            return <div></div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(document.getElementById("agtParam").value.length === 0) {
            alert("Please enter an Artist/Genre/Track.");
            return;
        }
        this.checkAGT(document.getElementById("agtParam").value, document.getElementById("agtType").value);
    }

    checkAGT(agt, type) {
        this.props.spotify.setAccessToken(this.props.token);

        if( (this.state.artists.length + this.state.tracks.length + this.state.genres.length) >= 5 ) {
            alert("Limit Reached.");
            return;
        }

        if(type === "track") {
            this.props.spotify.searchTracks(`track:${agt}`)
            .then(function(data) {
                if(data.body.tracks.items[0]) {
                    var updatedTracks = [...this.state.tracks].concat(data.body.tracks.items[0].id);
                    var updatedUserParams = [...this.state.userParams].concat(data.body.tracks.items[0].name);
                    this.setState({tracks: updatedTracks});
                    this.setState({userParams: updatedUserParams});
                } else {
                    alert("Track: " + agt + " was not found. Please enter a different Track.");
                }
            }.bind(this), function(err) {
            console.log('Something went wrong!', err);
            });
        }

        if(type === "artist") {
            this.props.spotify.searchArtists(`artist:${agt}`)
            .then(function(data) {
                if(data.body.artists.items[0]) {
                    var updatedArtists = [...this.state.artists].concat(data.body.artists.items[0].id);
                    var updatedUserParams = [...this.state.userParams].concat(data.body.artists.items[0].name);
                    this.setState({artists: updatedArtists});
                    this.setState({userParams: updatedUserParams});
                } else {
                    alert("Artist: " + agt + " was not found. Please enter a different Artist.");
                }
            }.bind(this), function(err) {
                console.error(err);
            });
        }

        if(type === "genre") {
            this.props.spotify.getAvailableGenreSeeds()
            .then(function(data) {
                if(data.body.genres.includes(agt)) {
                    var updatedGenres = [...this.state.genres].concat(agt);
                    var updatedUserParams = [...this.state.userParams].concat(agt);
                    this.setState({genres: updatedGenres});
                    this.setState({userParams: updatedUserParams});
                } else {
                    alert("Genre: " + agt + " was not found. Please enter a different Genre.");
                }
            }.bind(this), function(err) {
                console.error(err);
            });
        }
    }

    clearCurrentSelection() {
        this.setState({artists: []});
        this.setState({genres: []});
        this.setState({tracks: []});
        this.setState({userParams: []});
    }

    playTrack = async (id) => {
        await this.props.spotify.addToQueue("spotify:track:" + id)
            .then(function(data) {
                // console.log(data);
        }, function(err) {
                console.log('Something went wrong!', err);
                alert("No active device.");
        });

        await this.props.spotify.skipToNext()
            .then(function() {
                // console.log('Skip to next');
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    }

    render() {
        return (
            <div className="generate-playlist-container">
                <h3>Welcome to the Playlist Generator.</h3>

                <h5>Please enter your playlist's name.</h5>
                <form>
                    <input type="text" onChange={e => this.setState({playlistName: e.target.value})}/>
                </form>

                <h5>Please enter your Artist/Genre/Track (Limit: 5).</h5>
                <form onSubmit={this.handleSubmit}>
                    <select name="agtType" id="agtType">
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                        <option value="track">Track</option>
                    </select>  
                    <input type="text" id="agtParam"/>
                    <button type="submit">Add</button>
                    <button className="clear-btn" type="button" onClick={() => this.clearCurrentSelection()}>Clear All</button>
                </form>

                <h6>Current Selection: </h6>
                <h6>{this.state.userParams.map(agt => (<div key={Math.random()}> {agt} </div>))}</h6>

                <div>
                    <button className="generate-btn" onClick={() => this.getTracksForPlaylist()}>Generate</button>
                    <button onClick={() => this.setState({createPlaylist: !this.state.createPlaylist})}>{this.state.createPlaylist ? <p>Add Playlist</p>: <p>Don't Add Playlist</p>}</button>
                </div>

                <div className='generated-playlist-container'>{this.renderPlaylist()}</div>
            </div> 
        );
    }
}

export default GeneratePlaylist;
