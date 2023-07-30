import React, { useState, useEffect } from 'react';
import Single from '../components/Single';
import Loader from '../components/Loader';
import Link from 'next/link';
import {
  useGetAlbumDetailsQuery,
  useGetSongDetailsQuery,
} from '../redux/service';
import SongCard from '@/components/SongCard';
import { GiMicrophone } from 'react-icons/gi';
import Artist from '@/components/Artist';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import SingleAlbum from '@/components/Chart';
export default function SingleSong({ song, isPlaying, activeSong }) {
  console.log(song.song);
  if (!song.song) return <Loader title={'Loading album details...'} />;
  const { data, isFetching, error } = useGetSongDetailsQuery(song.song);
  console.log(data);
  if (isFetching || error) return <Loader title={'Loading song details...'} />;
  const songd = data?.data[0] || {};
  console.log(songd);
  const regex = /\d+/g;
  return (
    <div className="relative w-full flex flex-col">
      {/* <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" /> */}
      <div className="flex flex-col inset-0 items-center">
        <img
          alt="/loader.svg"
          src={songd.image[2]?.link}
          className="sm:w-48 w-36 sm:h-48 h-28 rounded-full object-contain border-2 shadow-xl shadow-black"
        />

        <div className="ml-2">
          <p className="font-bold sm:text-3xl text-xl text-dark-1">
            {songd?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-extralight sm:text-2xl flex flex-row  text-sm text-dark-1">
            {songd?.language}
            <GiMicrophone />
          </p>
          <p className="font-extralight sm:text-2xl text-sm text-dark-2 ml-8">
            {songd?.playCount}plays
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-extralight sm:text-2xl flex flex-row  text-sm text-dark-1">
            {songd?.year}
            <GiMicrophone />
          </p>
          <p className="font-extralight sm:text-2xl text-sm text-dark-2 ml-8">
            {songd?.label}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-1">
        {songd?.primaryArtistsId != '' ? (
          <>
            <h1 className="text-3xl mt-14 font-bold">Artists</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 cursor-pointer">
              {songd?.primaryArtistsId &&
                songd?.primaryArtistsId
                  .match(regex)
                  .map((artist) => <ArtistCard artist={{ id: artist }} />)}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
