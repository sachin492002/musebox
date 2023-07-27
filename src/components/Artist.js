import React,{useEffect,useState} from 'react'
import AlbumCard from '../components/AlbumCard'
import Single from '../components/Single'
export default function Artist({prop}){
    const [artist,setArtist] = useState(null);
    const [songs,setSongs] = useState(null);
    const [albums,setAlbums] = useState(null);
  
    useEffect(() => {
        Promise.all([
            fetch(`https://saavn.me/artists?id=${prop.id}`),
            fetch(`https://saavn.me/artists/${prop.id}/songs?page=1`),
            fetch(`https://saavn.me/artists/${prop.id}/albums?page=1`),
        ])
          .then(([resArtist,resSongs, resAlbums]) => 
            Promise.all([resArtist.json(), resSongs.json(),resAlbums.json()])
          )
          .then(([dataArtist,dataSongs, dataAlbums]) => {
            setArtist(dataArtist.data);
            setSongs(dataSongs.data.results);
            setAlbums(dataAlbums.data.results);
            console.log(artist)
          });
      }, [prop]);
    
    return (
        artist ? (
        <div className="container mx-auto py-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{artist.name}</h1>
          </div>
          <h1 className="text-3xl font-bold">Top Songs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {songs && songs.map((song) => (
              <Single song={song}/>
            ))}
          </div>
          <h1 className="text-3xl font-bold">Top Albums</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums && albums.map((album) => (
              <AlbumCard album={album}/>
            ))}
          </div>
          
        </div>):
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Loading...</h1>
        </div>

      );
}
