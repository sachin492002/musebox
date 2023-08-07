import React from 'react'
import {useSelector} from 'react-redux'
import Loader from "@/components/Loader";
import {
    useGetAlbumsBySearchQuery,
    useGetArtistBySearchQuery,
    useGetPlaylistsBySearchQuery,
    useGetSongsBySearchQuery
  } from '@/redux/service'
export default function ListSongs({searchTerm,total}) {
    const pages =  MATH.ceil(total/20);
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    useEffect(() => {
        async function fetchSongs() {
          setLoading(true);
          const allSongs = [];
    
          for (let page = 1; page <= pages; page++) {
            const response = await useGetSongsBySearchQuery(searchTerm, page);
    
            if (response && response.data && response.data.length > 0) {
              // Append the songs from the current page to the existing list
              allSongs.push(...response.data);
            }
          }
    
          setSongs(allSongs);
          setLoading(false);
        }
    
        fetchSongs();
      }, [searchTerm, pages]);
    
      if (loading) {
        return <Loader />;
      }
  return (
    <section>
        <div className="relative w-full flex flex-wrap flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
            {/* <!-- Card --> */}
            <div className="absolute flex flex-col items-center ">
                <h1 className='truncate text-3xl mt-14 font-bold'>Results for {decodeURIComponent(searchTerm)} </h1>
            </div>
            <h1 className="text-3xl mt-2 mb-5 font-bold"></h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {songs && songs.map((song,i) => (
                    <SongCard song={song}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                data={songs}
                                i={i}/>
                )) }
                </div>
        </div>
    </section>
  )
}
