import Navbar from '../components/Navbar';
import MusicPlayer from './MusicPlayer';
import { Provider, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Search from './Search';
import {useEffect, useState} from "react";
export default function Layout({ children }) {
  const { activeSong } = useSelector((state) => state.player);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    // Set the initial value for isMobileScreen on the client-side
    handleResize();

    // Add event listener to update isMobileScreen on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <div className="relative flex ">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-white/30 to-light-1 dark:to-dark-2 backdrop-blur-lg">
          <Search />
          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row ">
            <div className="flex-1 h-fit pb-40">
              <main>{children}</main>

            </div>
          </div>
        </div>
        {activeSong?.name && (
            isMobileScreen ?
            <div className="absolute h-96  bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-light-1 backdrop-blur-lg rounded-t-3xl z-10">
              <MusicPlayer />
            </div>: <div className="absolute h-28  bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-light-1 backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
          </div>
        )}
      </div>
    </>
  );
}
