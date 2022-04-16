import React from 'react'

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