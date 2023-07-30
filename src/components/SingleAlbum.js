import React,{useState,useEffect} from 'react'
import Single from '../components/Single'
import Loader from '../components/Loader';
import Link from 'next/link'
import {useGetAlbumDetailsQuery} from '../redux/service'
import SongCard from "@/components/SongCard";
import {GiMicrophone} from "react-icons/gi";
import Artist from "@/components/Artist";
import ArtistCard from "@/components/ArtistCard";
import {useSelector } from 'react-redux';
export default function SingleAlbum({album}) {
    const albumId = album?.id;
    console.log(album)
    if(!albumId) return <Loader title={"Loading album details..."}/>
    const {data , isFetching} = useGetAlbumDetailsQuery(albumId)
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    if (isFetching) return <Loader title={"Loading album details..."}/>

    const regex = /\d+/g;
    return (
        <div className="relative w-full flex flex-col">
            {/* <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" /> */}
            <div className="inset-0 flex flex-col items-center ">
                <img
                    alt={data?.data?.name}
                    src={
                        data?.data?.image[2]?.link
                    }
                    className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
                />

                <div className="ml-2">
                    <p className="font-bold sm:text-3xl text-xl text-dark-1">
                        {data?.data?.name}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="font-extralight sm:text-2xl flex flex-row  text-sm text-dark-1">{data?.data?.songCount}<GiMicrophone/></p>
                    <p className="font-extralight sm:text-2xl text-sm text-dark-1 ml-8">{data?.data?.year}</p>
                </div>
            </div>
            <div className="flex flex-col">

                {data?.data?.primaryArtistsId != "" ? <><h1 className="text-3xl mt-28 font-bold">Artists</h1>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                    {data?.data?.primaryArtistsId && data?.data?.primaryArtistsId.match(regex).map((artist) => (
                        <ArtistCard artist={{id:artist}}/>
                    ))}
                </div></> : null}

            </div>
            <h1 className="text-3xl mt-14 font-bold">Top Songs</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {data?.data?.songs && data?.data?.songs.map((song,i) => (
                    <SongCard key={song?.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data?.data?.songs}
                    i={i}/>
                ))}
            </div>
            </div>

      );
}


