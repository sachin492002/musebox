import React from 'react';

import SongCard from '../components/SongCard'
import {useSelector} from 'react-redux'

export default function Trending() {
  const {topCharts} = useSelector((state) => state.player)||[];
  const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
  const songs = topCharts.songs

  return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Songs...</h1>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {songs?.map((song, i) => (
        <SongCard
          key={song.id+'hello'}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={songs}
          i={i}
        />
      ))}
    </div>
  </div>

  );
}
