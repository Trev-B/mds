import React from 'react';
import {useEffect, useState} from "react";
//import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

/* Test data for recharts */
// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];
  
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
//     return (
//       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
// };
/* Test data for recharts */

const Analyzeplaylist = ({playlist}) => {
    const [artistDistribution, setArtistDistribution] = useState([]);

    useEffect(() => {
    
        if(playlist.length !== 0) {calcArtistDistribution(playlist)}
        
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

    return (
        <div>
            <div className="playlist-artist-dist">
                <h3>Artist Distribution</h3>
                {displayArtistDist()} 
            </div>
        </div>
    );
}

export default Analyzeplaylist;

/* Used for recharts */
// <PieChart width={400} height={400}>
                //     <Pie
                //         data={artistDistribution}
                //         cx="50%"
                //         cy="50%"
                //         labelLine={false}
                //         label={renderCustomizedLabel}
                //         outerRadius={80}
                //         fill="#8884d8"
                //         dataKey="value"
                //     >
                //         {data.map((entry, index) => (
                //         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                //         ))}
                //     </Pie>
                // </PieChart> :
                