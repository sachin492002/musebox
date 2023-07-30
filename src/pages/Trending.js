import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from '../components/AlbumCard';
import Single from '../components/Single';
import Loader from '../components/Loader';
import Link from 'next/link'
import SongCard from '../components/SongCard'
import {useSelector} from 'react-redux'
import {useGetHomePageQuery, useGetTopChartsQuery} from '../redux/service';
export default function Trending() {
  const [songs ,setSongs ] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://saavn.me/playlists?id=110858205');
        const data = await response.json();

        setSongs(data.data.songs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSongs([]); // Handle error by setting albums to an empty array
      }
    };

    fetchData().then(r => console.log(r));
  }, []);
  const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};


  return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Songs...</h1>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {songs?.map((song, i) => (
        <SongCard
          key={song?.id}
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
