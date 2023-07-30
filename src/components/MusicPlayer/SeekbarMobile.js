import React from 'react';

const SeekbarMobile = ({ value, min, max, onInput, setSeekTime, appTime }) => {
    // converts the time to format 0:00
    const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

    return (
        <div className="flex flex-row items-center justify-center">
            <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
            <input
                type="range"
                step="any"
                value={value}
                min={min}
                max={max}
                onInput={onInput}
                className="w-60 h-1 mx-4 rounded-lg"
            />
            <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
        </div>
    );
};

export default SeekbarMobile;
