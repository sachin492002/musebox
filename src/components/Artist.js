import React,{useEffect,useState} from 'react'
import AlbumCard from '../components/AlbumCard'
export default function Artist({id}){
    const [artist,setArtist] = useState(null);
    const [songs,setSongs] = useState(null);
    const [albums,setAlbums] = useState(null);
    useEffect(() => {
        Promise.all([
            fetch(`https://saavn.me/artists?id=${id.id}`),
            fetch(`https://saavn.me/artists/${id.id}/songs?page=1`),
            fetch(`https://saavn.me/artists/${id.id}/albums?page=1`),
        ])
          .then(([resArtist,resSongs, resAlbums]) => 
            Promise.all([resArtist.json(), resSongs.json(),resAlbums.json()])
          )
          .then(([dataArtist,dataSongs, dataAlbums]) => {
            setArtist(dataArtist.data);
            setSongs(dataSongs.data.results);
            setAlbums(dataAlbums.data.results);
           
          });
      }, []);
    console.log(artist)
    return (
        <div className="container mx-auto py-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{artist.name}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <AlbumCard album={album}/>
            ))}
          </div>
        </div>
      );
}
