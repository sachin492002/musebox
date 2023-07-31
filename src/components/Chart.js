import React from 'react'

import Loader from '../components/Loader';


import {useGetPlaylistDetailsQuery} from '../redux/service';
import SongCard from "@/components/SongCard";
import {useSelector} from "react-redux";

export default function Chart({chart}) {
    const chartId = chart?.id;
    if(!chartId) return <Loader title={"Loading charts..."}/>
    const { data , isFetching} = useGetPlaylistDetailsQuery(chartId)
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    if (isFetching) return <Loader title={"Loading chart..."}/>
    const songs = data?.data?.songs || [];

    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">{chart.title} -- Songs</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs?.map((song,i) => (
            <SongCard key={song?.id}
                      song={song}
                      isPlaying={isPlaying}
                      activeSong={activeSong}
                      data={songs}
                      i={i}/>
           ))}
          </div>
        </div>
      );
}


