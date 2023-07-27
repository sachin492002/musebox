import React from 'react';
import Link from 'next/link'
export default function AlbumCard({ album }) {
  console.log(album);
  return (
    <Link href={
      {
        pathname: `/album/${album.id}`,
        query: album, // the data
      }
    }>
    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover"
        src={album.image[2].link}
        alt={album.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{album.name}</h2>
        <p className="text-gray-600">{album.artists[0].name}</p>
      </div>
    </div>
    </Link>
  );
}
