import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import Loader from '../components/Loader'
import { useGetSongDetailsQuery} from '../redux/service'
export default function Single({songid}) {
    // const songid = id.songId
    if(!songid) return <Loader title={"Loading song details..."}/>
    
    const {data , isFetching,error} =  useGetSongDetailsQuery(songid)
    
    if (isFetching || error ) return <Loader title={"Loading song details..."}/>
    const song = data?.data[0] || {};
    
    const downloadSong = (downloadUrl,filename) => {
        fetch(downloadUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        });
    }

  return (
    

    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <img
        className="w-full h-48 object-cover"
        src={song?.image[2]?.link}
        alt={song?.name}
      />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{song.name}</h2>
      <p className="text-gray-600">{song.duration}s</p>
    </div>
    <div className="px-4 pb-4"> 
      <audio controls className="w-full">
        <source src={song?.downloadUrl[2]?.link} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
    </div> 
    <div className="px-4 pb-4">
      <button onClick={(e)=> {e.preventDefault();
        downloadSong(song.downloadUrl[2].link,song.name)}} className="text-blue-500 hover:text-blue-700 font-semibold">
        Download
      </button>
    </div>
  </div>
  );
}
