import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Artist from '../../components/Artist';
export default function index() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  const [songs, setSongs] = useState(null);
  const [type,setType] = useState('songs');
  useEffect(() => {
    const encodedSearchResults = router.query.searchResults;
    if (encodedSearchResults) {
      const decodedSearchResults = JSON.parse(
        decodeURIComponent(encodedSearchResults)
      );
      setSearchResults(decodedSearchResults);
      setType(router.query.type);
      (router.query.type=="songs")?setSongs(decodedSearchResults.data.results):(router.query.type=="albums")?setAlbums(decodedSearchResults.data.results):(router.query.type=="artists")?setAlbums(decodedSearchResults.data.results):0;
      
    }
  }, [router.query.searchResults]);
   
  return (
     <div className="container mx-auto py-8">
      {/* Display top query */}
      <h1 className="text-3xl font-bold mb-6">Results {type}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        songs ? (songs.map((song)=>(
            <Link href={{
                pathname: '/song/[id]',
                query: { id: song.id },
            }}>
              <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  className="w-full h-48 object-contain"
                  src={song.image[2].link}
                  alt={song.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{song.name}</h2>
                  <p className="text-light-1">{song.duration}</p>
                </div>
              </div>
              </Link>))
        ):null
     }
            
      
     {
        albums ? (albums.map((album)=>(
            <Link href={
                {
                  pathname: `/album/${album.id}`,
                  query: album, // the data
                }
              }>
              <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  className="w-full h-48 object-contain"
                  src={album.image[2].link}
                  alt={album.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{album.title}</h2>
                  <p className="text-gray-600">{album.artist}</p>
                </div>
              </div>
              </Link>))
        ):null
     }
     
     {
        artists ? (artists.map((artist)=>(
            
            <Link href={
                {
                  pathname: `/artist/${artist.id}`,
                  query: artist.id, 
                }
              }>
              <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  className="w-full h-48 object-contain"
                  src={artist.image[2].link}
                  alt={artist.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{artist.title}</h2>
                  
                </div>
              </div>
              </Link>))
        ):null
     }
      
     
    </div>
    </div>
  );
}
