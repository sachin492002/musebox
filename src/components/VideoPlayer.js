import React, { useRef, useEffect } from 'react';



const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnded = () => {
      videoElement.currentTime = 0;
      videoElement.play();
    };

    videoElement.addEventListener('ended', handleVideoEnded);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    
      <div className='flex justify-center items-center h-[100vh] preload'>
      <video ref={videoRef} autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    
  );
};

export default VideoPlayer;
