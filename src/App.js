import {useEffect, useState} from "react";
import './App.css';
// import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import TopTracks from './TopTracks';
import GeneratePlaylist from './GeneratePlaylist';
import Nav from "./components/Nav/Nav";
import AnalyzePlaylist from "./components/AnalyzePlaylist/AnalyzePlaylist";
import PlaylistBar from "./PlaylistBar";

function App() {
    const CLIENT_ID = "edff2062bb8e47e48622966107b668b5";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public', 'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-private', 'user-library-read'];

    const [token, setToken] = useState("");
    const [topTracks, setTopTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPlaylist, setCurrentPlaylist] = useState({
        songs: ["rock", "jazz", "rap", "deez", "nuts"]
        });
    const [userInfo, setUserInfo] = useState({});
    const [navVisible, setNavVisible] = useState(true);
    
    // const [searchKey, setSearchKey] = useState("");
    // const [artists, setArtists] = useState([]);
    // const [spotify, setSpotify] = useState();

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
            window.localStorage.setItem("token", token);
        }
        
        setToken(token);
        spotifyApi.setAccessToken(token);

        if(token) {

            /* Get a User’s Top Tracks*/
            spotifyApi.getMyTopTracks()
                .then(function(data) {
                    let topTracks = data.body.items;
                    setTopTracks(topTracks);
                }, function(err) {
                    console.log('Something went wrong!', err);
            });

            
            spotifyApi.getMe()
                .then(function(data) {
                    //console.log('Some information about the authenticated user', data.body);
                    setUserInfo(data.body); 
                }, function(err) {
                    console.log('Something went wrong!', err);
            });
            
        }

    }, [])

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }

    return (
        <div className="App">

                {!token ?
                    <div className="login-screen">
                        <h1>More Detailed Spotify</h1>
                        <a className="login-btn" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`}>Login to Spotify</a>
                    </div>

                    : <div className="App-container">

                        <div className="App-header">
                            <button onClick= {() => setNavVisible(!navVisible)} className=""> ≡ </button>
                            <p>More Detailed Spotify</p>        
                        </div>

                        <div className="main-content">

                            {navVisible ?
                            <div className="nav-bar-flex">
                                <Nav setCurrentPage={setCurrentPage} currentPage={currentPage} logout={logout}/>
                            </div> 
                            : <div/>
                            }

                            <div className="current-page">
                                {(currentPage === 1) ? 
                                <TopTracks topTracks={topTracks} userInfo={userInfo}/>
                                : <div/>
                                }
                                {(currentPage === 2) ?
                                <GeneratePlaylist spotify={spotifyApi} token={token}/>
                                : <div/>
                                }
                                {(currentPage === 3) ?
                                // <AnalyzePlaylist playlist={currentPlaylist}/>
                                <PlaylistBar spotify={spotifyApi} userInfo={userInfo}></PlaylistBar>
                                : <div/>
                                }
                            </div>

                        </div>

                    </div>
                }        
        </div>
    );
}

export default App;


{/* {token ?
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>

                : <h2>Please login</h2>
            }
            {renderArtists()} */}


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

// const getToken = () => {
//     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
//     let token = urlParams.get('access_token');
// }
