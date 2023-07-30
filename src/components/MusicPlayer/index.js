'use client'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePathname, useSearchParams} from 'next/navigation'
import {nextSong, playPause, prevSong, setopenPlayer} from '../../redux/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

import {useRouter} from "next/router";
import {BsArrowUpRightCircle} from 'react-icons/bs'
import SeekbarMobile from "@/components/MusicPlayer/SeekbarMobile";


const MusicPlayer = () => {
  const router = useRouter();

  const { activeSong, currentSongs, currentIndex, isActive, isPlaying ,openPlayer} = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        if(pathname!='/song'){
            dispatch(setopenPlayer(false))
        }
    }, [pathname, searchParams])
  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;
    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs?.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleClick =  (openit,e) =>{
      e.stopPropagation();
    if(openit){
      dispatch(setopenPlayer(true));
    router.push({
      pathname: '/song/[id]',
      query: {id: activeSong.id},
    }).then(r  =>
    console.log("hello"))}
  }
  const isMobileScreen = window.innerWidth <= 768;
  if(!isMobileScreen)
  return (
      <div className="relative px-8 w-full flex items-center justify-between" onClick={(e)=>handleClick(openPlayer,e)}>
          <BsArrowUpRightCircle onClick={(e) => handleClick(true,e)} className='text-light-1 text-5xl mr-2'/>
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">

      <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />

        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />

    </div>)
else {
return(
    <div className="relative px-8 w-full flex-col flex items-center justify-between" onClick={(e)=>handleClick(openPlayer,e)}>
     <div className='w-[20%] h-2 bg-dark-3 mt-2 rounded-full' onClick={(e) => handleClick(true,e)}></div>
      <div className="flex-1 flex flex-row items-center  justify-between">
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
        />
      </div>      <SeekbarMobile
            value={appTime}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
        />
        <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
        />


    </div>)}
};

export default MusicPlayer;
