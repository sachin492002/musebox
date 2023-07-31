import React from 'react'
import Loader from '../components/Loader';
import {useSelector} from 'react-redux'
import {GiMicrophone} from 'react-icons/gi'
import {useGetArtistAlbumsQuery, useGetArtistDetailsQuery, useGetArtistSongsQuery} from '../redux/service';
import SongCard from "@/components/SongCard";
import AlbumCard from "@/components/AlbumCard";

export default function Artist({artistId}){

    if(!artistId) return <Loader title={"Loading artist details..."}/>

    const {data: artistData, isFetching:isFetchingArtistDetails} =  useGetArtistDetailsQuery(artistId)
    const {data:songsData, isFetching:isFetchingArtistSongs} =  useGetArtistSongsQuery(artistId)
    const {data:albumsData, isFetching:isFetchingArtistAlbums} =  useGetArtistAlbumsQuery(artistId)
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    if (isFetchingArtistDetails || isFetchingArtistSongs || isFetchingArtistAlbums) return <Loader title={"Loading artist details..."}/>
    const artist = artistData?.data|| {};
    const songs = songsData?.data?.results || [];
    const albums = albumsData?.data?.results || [];


    return (
        <div className="relative w-full flex flex-wrap flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

            <div className="absolute flex flex-col inset-0 items-center ">
                <img
                    alt={artist.name}
                    src={
                        artist.image[2].link
                    }
                    className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
                />

                <div className="ml-2">
                    <p className="font-bold sm:text-3xl text-xl text-dark-1">
                        {artist.name}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="font-extralight sm:text-2xl text-sm text-dark-1">Followers : {artist?.followerCount}</p>
                    <p className="font-extralight flex flex-row sm:text-2xl text-sm text-dark-1 ml-8"><GiMicrophone/>{artist?.dominantLanguage}</p>
                </div>
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
                <h1 className="text-3xl mt-14 mb-5 font-bold">Top Albums</h1>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                    {albums && albums.map((album,i) => (
                        <AlbumCard album={album}/>
                    ))}
                </div>

        </div>


      );
}
