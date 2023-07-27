import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AlbumCard from '../components/AlbumCard'
export default function Albums() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://musix-phi.vercel.app/modules?language=hindi,english');
        const data = await response.json();
        console.log(data.data.albums[0].name);
        setAlbums(data.data.albums);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlbums([]); // Handle error by setting albums to an empty array
      }
    };

    fetchData();
  }, []);
    console.log(albums)
    
    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Albums</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums?.map((album) => (
             <AlbumCard album={album} />
            ))}
          </div>
        </div>
      );
}
