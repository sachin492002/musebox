import React from 'react';
import Loader from '../components/Loader';
import {useGetSongDetailsQuery,} from '../redux/service';
import {GiMicrophone} from 'react-icons/gi';
import {FaLanguage} from 'react-icons/fa';
import {AiFillPlayCircle} from 'react-icons/ai';
import {BiSolidLabel} from 'react-icons/bi';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download'
import ArtistCard from '@/components/ArtistCard';
import {useRouter} from 'next/router';

export default function SingleSong({ song, isPlaying, activeSong }) {
  const router = useRouter();
  if(activeSong.id && activeSong?.id!=song.song){
    song.song = activeSong.id
  }
  console.log(song.song);
  if (!song.song) return <Loader title={'Loading song details...'} />;
  const { data, isFetching, error } = useGetSongDetailsQuery(song.song);
  console.log(data);
  if (isFetching || error) return <Loader title={'Loading song details...'} />;
  const songd = data?.data[0] || {};
  console.log(songd);
  const regex = /\d+/g;
  const downloadSong = (downloadUrl, filename) => {
    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename+'.mp3';
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  const handleDownloadClick = () => {
    const downloadUrl = songd?.downloadUrl[2]?.link;
    const filename = songd?.name;
    if (downloadUrl && filename) {
      downloadSong(downloadUrl, filename);
    }
}
  return (
    <div className="relative flex w-full flex-col mt-8">
      {/* <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" /> */}
      <div className="flex flex-col md:flex-row inset-0 items-center justify-center md:space-x-24 ">
        <img
          alt="/loader.svg"
          src={songd.image[2]?.link}
          className="w-80  h-80 md:h-28 md:w-28 rounded-full animate-[spin_3s_linear_infinite] object-contain border-2 shadow-xl shadow-black"
        />

        <UseAnimations animation={download} size={56} strokeColor='#172021' fillColor='#172021' size={130} loop autoplay onClick={handleDownloadClick}/>
         <div className="flex flex-col items-center justify-between">
        <div className="ml-2">
          <p className="font-bold sm:text-3xl text-xl text-dark-1">
            {songd?.name}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between">
          <p className="font-extralight sm:text-2xl inline-flex  text-sm text-dark-2">
          <FaLanguage className='mr-2 mt-2'/>
            {songd?.language}

          </p>
          <p className="font-extralight inline-flex sm:text-2xl text-sm text-dark-2 ml-8">
            {songd?.playCount}<AiFillPlayCircle className='mr-2 mt-1'/>
          </p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="font-extralight sm:text-2xl inline-flex  text-sm text-dark-2">
          <GiMicrophone className='mr-2 mt-2' />{songd?.year}

          </p>
          <p className="font-extralight sm:text-2xl inline-flex text-sm text-dark-2 ml-8">
          <BiSolidLabel className='mr-2 mt-1'/>{songd?.label}
          </p>
        </div>
      </div>
    </div>
      <div className="flex flex-col mt-1">
        {songd?.primaryArtistsId !== '' ? (
          <>
            <h1 className="text-3xl mt-14 font-bold">Artists</h1>
            <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 cursor-pointer mt-2">
              {songd?.primaryArtistsId &&
                songd?.primaryArtistsId
                  .match(regex)
                  .map((artist) => <ArtistCard key={artist?.id } artist={{ id: artist }} />)}
            </div>
          </>
        ) : null}
      </div>
    </div>

  );
}
