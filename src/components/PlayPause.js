import React from 'react';
import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && activeSong?.name === song.name ? (
  <FaPauseCircle
    size={35}
    className="text-light-1"
    onClick={handlePause}
  />
) : (
  <FaPlayCircle
    size={35}
    className="text-light-1"
    onClick={handlePlay}
  />
));

export default PlayPause;
