import Navbar from '../components/Navbar';
import MusicPlayer from './MusicPlayer';
import { Provider, useSelector,useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Search from './Search';
import {setTopCharts } from '../redux/playerSlice'
import {useEffect, useState} from "react";
import {useGetTopChartsQuery} from '../redux/service'
export default function Layout({ children }) {
  const { activeSong } = useSelector((state) => state.player);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const dispatch = useDispatch();
  const [songs,setSongs] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://saavn.me/playlists?id=110858205');
        const data = await response.json();
        dispatch(setTopCharts(data?.data))
        console.log(data?.data)
        setSongs(data.data.songs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSongs([]); // Handle error by setting albums to an empty array
      }
    };
    fetchData().then(r => console.log(r));
  }, []);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

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
