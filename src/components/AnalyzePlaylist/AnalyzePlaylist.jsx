import React from 'react'
import PlaylistParams from '../../PlaylistParams'

const AnalyzePlaylist = ({playlist}) => {
    function collectGenre(playlist){

    }
  return (
    <div>
      
      {playlist.songs.map(genre => (
      <div>
      {genre}
      </div>
      ))}</div>
  )
}

export default AnalyzePlaylist