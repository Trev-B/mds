import {useEffect, useState} from "react";
import './App.css';
//import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import TopTracks from './TopTracks';
import GeneratePlaylist from './GeneratePlaylist';
import Nav from "./components/Nav/Nav";
import AnalyzePlaylist from "./components/AnalyzePlaylist/AnalyzePlaylist";

function App() {
    const CLIENT_ID = "0ad564778439400288b8a2d44b3d0622";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public'];

    const [token, setToken] = useState("");
    const [topTracks, setTopTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPlaylist, setCurrentPlaylist] = useState({
        songs: ["rock", "jazz", "rap", "deez", "nuts"]
        });
    
    // const [searchKey, setSearchKey] = useState("");
    // const [artists, setArtists] = useState([]);
    // const [spotify, setSpotify] = useState();

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    });
    
    
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            
            window.location.hash = "";
            //window.localStorage.setItem("token", token);
        }
        
        setToken(token);
        //setSpotify(spotifyApi);
        spotifyApi.setAccessToken(token);
        // console.log(spotifyApi);

        if(token) {

            /* Get a User’s Top Tracks*/
            spotifyApi.getMyTopTracks()
            .then(function(data) {
            let topTracks = data.body.items;
            setTopTracks(topTracks);
            }, function(err) {
            console.log('Something went wrong!', err);
            });

        }

    }, [])

    const logout = () => {
        setToken("");
        //window.localStorage.removeItem("token");
    }

    // const searchArtists = async (e) => {
    //     e.preventDefault()
    //     const {data} = await axios.get("https://api.spotify.com/v1/search", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         params: {
    //             q: searchKey,
    //             type: "artist"
    //         }
    //     })

    //     setArtists(data.artists.items)
    // }

    // const renderArtists = () => {
    //     return artists.map(artist => (
    //         <div key={artist.id}>
    //             {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
    //             {artist.name}
    //         </div>
    //     ))
    // }

    // const renderTopTracks = () => {
    //     return topTracks.map(track => (
    //         <div key={track.id}>
    //             {/* {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>} */}
    //             {track.name}
    //         </div>
    //     ))
    // }


    return (
        <div className="App">
            
            <header className="App-header">

                
                <h1>More Detailed Spotify</h1>
                
                {!token ?
                     <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`}>Login
                         to Spotify</a>
                    : <button onClick={logout}>Logout</button>
                }

                {token ?
                    <div>
                        <div className="nav-bar"><Nav setCurrentPage={setCurrentPage} currentPage={currentPage}/></div>
                        {(currentPage === 1) ? 
                        <TopTracks topTracks={topTracks}/>
                        : <div/>
                        }
                        {(currentPage === 2) ?
                        <GeneratePlaylist spotify={spotifyApi} token={token}/>
                        : <div/>
                        }
                        {(currentPage === 3) ?
                        <AnalyzePlaylist playlist={currentPlaylist}/>
                        : <div/>
                        }
                        {/* <TopTracks topTracks={topTracks}></TopTracks>
                        <GeneratePlaylist spotify={spotifyApi} token={token}/> */}
                        
                    </div>
                    : <h2>Welcome</h2>
                }

                {/* {token ?
                    <form onSubmit={searchArtists}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }
                {renderArtists()} */}

            </header>
        </div>
    );
}

export default App;
