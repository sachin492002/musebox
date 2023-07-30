import React from 'react';

import AlbumCard from "@/components/AlbumCard";
import SongCard from "@/components/SongCard";
import ArtistCard from "@/components/ArtistCard";
import {useSelector} from "react-redux";
import ChartCard from "@/components/ChartCard";

export default function SearchResults({data}){
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    const {songs,albums,artists,playlists,searchTerm} = data

    return (
        <div className="relative w-full flex flex-wrap flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

            <div className="absolute flex flex-col items-center ">
                <h1 className='truncate text-3xl mt-14 font-bold'>Results for {decodeURIComponent(searchTerm)} </h1>
            </div>
            <h1 className="text-3xl mt-14 mb-5 font-bold">Top Songs</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {songs && songs.map((song,i) => (
                    <SongCard song={song}
                              isPlaying={isPlaying}
                              activeSong={activeSong}
                              data={songs}
                              i={i}/>
                ))}
            </div>
            {albums.length>0 && <>
            <h1 className="text-3xl mt-14 mb-5 font-bold">Top Albums</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {albums && albums.map((album,i) => (
                    <AlbumCard album={album}/>
                ))}
            </div></>}
            {playlists.length>0 &&<>
            <h1 className="text-3xl mt-14 mb-5 font-bold">Top Playlists</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {playlists && playlists?.map((playlist,i) => (
                    <ChartCard chart={playlist}/>
                ))}
            </div></>}{
            artists.length>0 && <>
            <h1 className="text-3xl mt-14 mb-5 font-bold">Top Artists</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {artists && artists.map((artist,i) => (
                    <ArtistCard artist={artist}/>
                ))}
            </div></>}
        </div>
    )
}
