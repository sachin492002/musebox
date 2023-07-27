import React,{useState,useEffect} from 'react'
import Single from '../components/Single'
export default function SingleAlbum({album}) {
    const [songs,setSongs] =useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://saavn.me/albums?id=${album.id}`);
            const data = await response.json();
            setSongs(data.data.songs);
            
          } catch (error) {
            console.error('Error fetching data:', error);
            setSongs([]);
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">{album.name} -- Songs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs?.map((song) => (
            <Single song={song} />
           ))}
          </div>
        </div>
      );
}


