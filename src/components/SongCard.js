import React from 'react';
import Link from 'next/link'
import {useDispatch} from 'react-redux';
import Loader from '../components/Loader'
import PlayPause from './PlayPause';
import {playPause, setActiveSong} from '../redux/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
    // const songid = song?.id;
    if(!song) return <Loader title={"Loading song details..."}/>
    const regex = /\d+/g;
    const artists = song?.primaryArtists?.split(',') || [];
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));

    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-1.2 h-1/3 p-1 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-30 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.name === song?.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song?.image[2]?.link} className="w-full h-full rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-dark-1 truncate">
        <Link href={{
            pathname: '/song/[id]',
            query: { id: song?.id },
        }}>
            {song?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {song?.artists?.map((artist) => (
              <React.Fragment key={artist.id}>
                <Link
                    href={{
                      pathname: '/artist/[id]',
                      query: artist,
                    }}
                >
                  <a className="text-blue-500">{artist.name}</a>
                </Link>
              </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
