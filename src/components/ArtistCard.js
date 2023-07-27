import React from 'react';
import Link from 'next/link'
export default function ArtistCard({ artist }) {
  
  return (
    <Link href={
      {
        pathname: `/artist/${artist.id}`,
        query: artist, // the data
      }
    }>
    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover"
        src={artist.image[2].link}
        alt={artist.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{artist.name}</h2>
        {/* <p className="text-gray-600">{artist.artists[0].name}</p> */}
      </div>
    </div>
    </Link>
  );
}
