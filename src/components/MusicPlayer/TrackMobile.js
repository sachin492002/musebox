import React from 'react';

const TrackMobile = ({ isPlaying, isActive, activeSong }) => (
    <div className="flex flex-col items-center justify-center">
        <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} mt-8 h-24 w-24 mr-4`}>
            <img src={activeSong?.image[2].link} alt="cover art" className="rounded-full" />
        </div>
        <div className="w-[80%]">
            <p className="truncate text-dark-2 font-bold text-lg">
                {activeSong?.name ? activeSong?.name : 'No active Song'}
            </p>
            <p className="truncate text-dark-3">
                {activeSong?.album.name ? activeSong?.album.name : 'No active Song'}
            </p>
        </div>
    </div>
);

export default TrackMobile;
