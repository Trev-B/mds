import React, { Component } from 'react';
import PlaylistParams from './PlaylistParams';

class GeneratePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {  visible: true, 
                        playlist: null, 
                        playlistID: null,
                        playlistName: null,
                        artists: null,
                        genres: null,
                        tracks: null,
                        userParams: [] };
    }
    
    
    
    setVisible() {
        this.setState({ visible: !this.state.visible});
    }

    getTracksForPlaylist() {
        //this.props.spotify.setAccessToken(this.props.token);

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
                <div key={track.id}>
                    {track.name}
                </div>
            ))
        } else {
            return <div>No Playlist</div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.checkAGT(this.state.userParams[0], this.state.userParams[1]);
    }

    checkAGT(agt, type) {
        this.props.spotify.setAccessToken(this.props.token);

        if(type == "track") {
            this.props.spotify.searchTracks(`track:${agt}`)
            .then(function(data) {
            if(data.body.tracks.items[0]) {
                this.setState({tracks: data.body.tracks.items[0].id}, () => {this.getTracksForPlaylist()});
            } else {
                alert("Track: " + agt + " was not found. Please enter a different Track.");
            }
            }.bind(this), function(err) {
            console.log('Something went wrong!', err);
            });
        }

        if(type == "artist") {
            this.props.spotify.searchArtists(`artist:${agt}`)
            .then(function(data) {
                if(data.body.artists.items[0]) {
                    // this.setState(previousState => ({
                    //     artists: [...previousState.artists, data.body.artists.items[0].id]
                    // }));
                    this.setState({artists: data.body.artists.items[0].id}, () => {this.getTracksForPlaylist()})
                } else {
                    alert("Artist: " + agt + " was not found. Please enter a different Artist.");
                }
            }.bind(this), function(err) {
                console.error(err);
            });
        }

        if(type == "genre") {
            this.props.spotify.getAvailableGenreSeeds()
            .then(function(data) {
                if(data.body.genres.includes(agt)) {
                    this.setState({genres: agt}, () => {this.getTracksForPlaylist()})
                } else {
                    alert("Genre: " + agt + " was not found. Please enter a different Genre.");
                }
            }.bind(this), function(err) {
                console.error(err);
            });
        }
    }

    setUserParams(agt, type) {
        // this.setState(previousState => ({
        //     userParams: [...previousState.userParams, input]
        // }));
        this.setState({userParams: [agt,type]});
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setVisible()}>Goto Playlist Generator</button>
                {this.state.visible ?
                    <div>
                        <h1>Welcome to the Playlist Generator.</h1>

                        <h5>Please enter your playlist's name.</h5>
                        <form>
                            <input type="text" onChange={e => this.setState({playlistName: e.target.value})}/>
                        </form>

                        <h5>Please enter your Artist/Genre/Track.</h5>
                        <form onSubmit={this.handleSubmit}>
                            <PlaylistParams data={
                                { userParams:this.state.userParams,
                                setUserParams:this.setUserParams.bind(this)}
                            }></PlaylistParams>
                            <button type={"submit"}>Generate</button>
                        </form>

                        <h2>{this.renderPlaylist()}</h2>
                        
                    </div> :
                    <div></div>
                }
            </div>
        );
    }
}

export default GeneratePlaylist;
