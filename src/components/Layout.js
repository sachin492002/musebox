import MusicPlayer from './MusicPlayer';
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from '../components/Sidebar';
import Search from './Search';
import {sethomepageData, setTopCharts} from '../redux/playerSlice'
import {useEffect, useState} from "react";

export default function Layout({ children }) {
  const { activeSong } = useSelector((state) => state.player);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API1}playlists?id=110858205`);
        const data = await response.json();
        dispatch(setTopCharts(data?.data))
        const response1 = await fetch(`${process.env.NEXT_PUBLIC_API1}modules?language=hindi,english,haryanvi`);
        const data1= await response1.json();
        dispatch(sethomepageData(data1?.data));
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <div className="relative flex flex-row w-full">

        <div className="flex-1 flex flex-row bg-gradient-to-br from-white/30 to-light-1 dark:to-dark-2 backdrop-blur-lg">
          <Sidebar/>
          <div className='flex flex-col flex-1'>
            <Search />
            <div className="px-6 h-[calc(100vh-90px)] lg:h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row ">

              <div className="flex-1  h-fit pb-40">
              <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
        {activeSong?.name && (
            isMobileScreen ?
                <div className="absolute h-32  bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-light-1 backdrop-blur-lg rounded-t-3xl ">
                  <MusicPlayer />
                </div>: <div className="absolute h-28  bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-light-1 backdrop-blur-lg rounded-t-3xl z-10">
                  <MusicPlayer />
                </div>
        )}
      </div>

    </>
  );
}
