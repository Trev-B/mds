import React from 'react';
import {useEffect, useState} from "react";
//import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./AnalyzePlaylist.css"

const Analyzeplaylist = ({playlist}) => {
    const [artistDistribution, setArtistDistribution] = useState([]);

    useEffect(() => {
    
        if(playlist.length !== 0) {
            calcArtistDistribution(playlist);
        }
        
    }, [playlist])

    const calcArtistDistribution = (playlist) => {
        var artistDist = [];
        for (var track of playlist) {

            var artistName = track.track.artists[0].name;
            var index = artistDist.findIndex(artist => artist.name === artistName);

            if (index === -1) {
                artistDist.push({name: artistName, value: 1});
            } else {
                artistDist[index].value++;
            }
        }
        setArtistDistribution(artistDist);
    }

    const displayArtistDist = () => {
        if(artistDistribution.length === 0) {
            return <div></div>
        }
        else {
            return artistDistribution.map(artist => <p key={artist.name}>{`${artist.name}: ${Math.round(artist.value/playlist.length*100)}%`} </p>)
        }       
    }

    const CustomTooltip = ({ label }) => {
        if ( label ) {
          return (
                <div className="custom-tooltip">
                <p>Artist: {label}</p>
                <p>Count: {getCount(label)}</p>
                </div>
            );
        } else {
            return (
                <div className="custom-tooltip">
                  <p>No Data</p>
                </div>
            );
        }
    }

    const getCount = (label) => {
        var index = artistDistribution.findIndex(artist => artist.name === label);
        if(index === -1) 
            return -1;
        else
            return artistDistribution[index].value;
    };

    return (
        <div className="analyze-playlist-container">
            <div className="playlist-artist-dist">
            
                    <h6>Artist Distribution</h6>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                            <YAxis />
                            <Legend/>
                            <Bar dataKey="value" fill="#8884d8" />
                            <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h6>Artist Distribution</h6>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                            <YAxis />
                            <Legend/>
                            <Bar dataKey="value" fill="#8884d8" />
                            <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h6>Artist Distribution</h6>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                            <YAxis />
                            <Legend/>
                            <Bar dataKey="value" fill="#8884d8" />
                            <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h6>Artist Distribution</h6>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                            <YAxis />
                            <Legend/>
                            <Bar dataKey="value" fill="#8884d8" />
                            <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h6>Artist Distribution</h6>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                            <YAxis />
                            <Legend/>
                            <Bar dataKey="value" fill="#8884d8" />
                            <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                    </ResponsiveContainer>

            </div>

            {/* <div className="playlist-genre-dist">
                
                    <BarChart width={1300} height={400} data={artistDistribution} margin={{top: 10, right: 50,left: 0,  bottom: 5}} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={90} interval={0} dy={20} hide={"false"}/>
                        <YAxis />
                        <Legend/>
                        <Bar dataKey="value" fill="#8884d8" />
                        <Tooltip content={<CustomTooltip />} />
                    </BarChart>
                
            </div> */}

        </div>
    );
}

export default Analyzeplaylist;
                