import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  useGetSongsBySearchQuery,
  useGetAlbumsBySearchQuery,
  useGetArtistBySearchQuery, useGetArtistDetailsQuery, useGetArtistSongsQuery, useGetArtistAlbumsQuery
} from '@/redux/service'
import Artist from '../../components/Artist';
import Loader from "@/components/Loader";
import AlbumCard from "@/components/AlbumCard";
import SongCard from "@/components/SongCard";
import {GiMicrophone} from "react-icons/gi";
import ArtistCard from "@/components/ArtistCard";
import {useSelector} from "react-redux";
export default function index() {
  const router = useRouter();
  const searchTerm = router.query.searchTerm;
  if(!searchTerm) return <Loader title={"Loading artist details..."}/>
  const searchItem = decodeURIComponent(searchTerm);
  const {data: artistData, isFetching:isFetchingArtistDetails} =  useGetArtistBySearchQuery(searchTerm)
  const {data:songsData, isFetching:isFetchingArtistSongs} =  useGetSongsBySearchQuery(searchTerm)
  const {data:albumsData, isFetching:isFetchingArtistAlbums} =  useGetAlbumsBySearchQuery(searchTerm)
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
  if (isFetchingArtistDetails || isFetchingArtistSongs || isFetchingArtistAlbums) return <Loader title={"Loading artist details..."}/>
  const artists = artistData?.data?.results|| {};
  const songs = songsData?.data?.results || [];
  const albums = albumsData?.data?.results || [];

  return (
      <div className="relative w-full flex flex-col justify-center items-center">
        {/*<div className=" w-full bg-gradient-to-l from-transparent to-light-1 sm:h-48 h-28"/>*/}
          <h1 className="truncate text-5xl mt-1 font-bold">Results for {searchItem}...</h1>
        <div className="flex flex-col">

          {songs ? <><h1 className="text-3xl mt-14 font-bold">Songs</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
              {songs.map((song,i) => (
                  <SongCard key={song?.id}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={songs}
                            i={i}/>
              ))}
            </div></> : null}

          {albums ? <><h1 className="text-3xl mt-14 font-bold">Albums</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
              {albums.map((album) => (
                  <AlbumCard album={album}/>
              ))}
            </div></> : null}
          {artists ? <><h1 className="text-3xl mt-14 font-bold">Artists</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
              {artists.map((artist) => (
                
                  <ArtistCard artist={{id:artist.id}}/>
              ))}
            </div></> : null}

      </div>
      </div>
  );
}
