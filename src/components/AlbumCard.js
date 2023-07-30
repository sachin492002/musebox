import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
export default function AlbumCard({ album }) {
  return (
    <Link
      href={{
        pathname: `/album/${album.id}`,
        query: album, // the data
      }}
    >
      <div className="flex flex-col w-1.2 h-1/3 p-1 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-30 group">
          <img
            alt="song_img"
            src={album.image[2].link}
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-dark-1 truncate">
            {album.name}
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            { album?.artists?.map((artist)=>
            <Link
              href={{
                pathname: '/artist/[id]',
                query: artist,
              }}
            >
              {artist.name} ,
            </Link>)}
          </p>
        </div>
      </div>
    </Link>
  );
}
