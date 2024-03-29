import React,{useState,useEffect} from 'react';

import AlbumCard from "@/components/AlbumCard";
import SongCard from "@/components/SongCard";
import ArtistCard from "@/components/ArtistCard";
import {useSelector} from "react-redux";
import ChartCard from "@/components/ChartCard";
import ListedResults from '@/components/ListedResults';
import Loader from "@/components/Loader";

import {
    useGetAlbumsBySearchQuery,
    useGetArtistBySearchQuery,
    useGetPlaylistsBySearchQuery,
    useGetSongsBySearchQuery
  } from '@/redux/service'
export default function SearchResults({data}){
    const { songsData, albumsData, artistsData, playlistsData, searchTerm } = data;
    const { activeSong, isPlaying } = useSelector((state) => state.player) || {};
  
    const cardsPerPage = 20;
     console.log(data);
    // Separate states for each category
    const [songPage, setSongPage] = useState(1);
    const [albumPage, setAlbumPage] = useState(1);
    const [playlistPage, setPlaylistPage] = useState(1);
    const [artistPage, setArtistPage] = useState(1);
  
    // Slice the data based on the current page for each category
    const songs = songsData;
    const albums = albumsData;
    const playlists = playlistsData;
    const artists = artistsData;
  
    
  
    
  

    return (
        <div className="relative w-full flex flex-wrap flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

            <div className="absolute flex flex-col items-center ">
                <h1 className='truncate text-3xl mt-14 font-bold'>Results for {decodeURIComponent(searchTerm)} </h1>
            </div>
            <h1 className="text-3xl mt-2 mb-5 font-bold">Top Songs</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {songs && songs.map((song,i) => (
                    <SongCard song={song}
                              isPlaying={isPlaying}
                              activeSong={activeSong}
                              data={songs}
                              i={i}/>
                )) }
                {songsData.length > cardsPerPage && songPage * cardsPerPage < songsData.length && (<div className="flex w-1.2 h-60 p-1 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={handleShowMoreSongs}>
      <div className="relative w-full  flex justify-center items-center group"> <div className='absolute  bg-black bg-opacity-50 animate-bounce'><img className='hi h-28' src='/showmore.png'/></div></div></div>)}
      {songPage * cardsPerPage > songsData.length && (<div className="flex flex-col w-1.2 h-60 p-1 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={handleShowLessSongs}>
      <div className="relative w-full h-28 group"> <div className='absolute inset-0 justify-center items-center bg-black bg-opacity-50'><img  src='https://static.thenounproject.com/png/541015-200.png'/></div></div></div>)}
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
               
            </div></>}
           
            {
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
