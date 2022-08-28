import {useEffect, useState} from "react";
import './styles/App.css';
import SpotifyWebApi from 'spotify-web-api-node';
import ProfileOverview from './components/ProfileOverview';
import PlaylistGenerator from './components/PlaylistGenerator';
import Nav from "./components/Nav";
import PlaylistBar from "./components/PlaylistBar";
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

function App() {
    const CLIENT_ID = "0ad564778439400288b8a2d44b3d0622";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public', 'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-private', 'user-library-read', 'user-modify-playback-state'];

    const [token, setToken] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [navVisible, setNavVisible] = useState(true);
    
    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    const spotifyApi = new SpotifyWebApi({
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
                            <button onClick= {() => setNavVisible(!navVisible)} className=""> <FormatAlignJustifyIcon/> </button>
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
                                <ProfileOverview spotify={spotifyApi}/>
                                : <div/>
                                }
                                {(currentPage === 2) ?
                                <PlaylistGenerator spotify={spotifyApi}/>
                                : <div/>
                                }
                                {(currentPage === 3) ?
                                <PlaylistBar spotify={spotifyApi}/>
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
