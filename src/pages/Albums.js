import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Link from 'next/link';
import { useGetHomePageQuery } from '../redux/service';

export default function Albums() {
  const [albums, setAlbums] = useState(null);
  const { data, isFetching, error } = useGetHomePageQuery();
  if (isFetching) return <Loader title={'Loading albums...'} />;
  return (
      <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Top Albums...</h1>
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">

          {data?.data?.albums.map((album, i) => (
              <AlbumCard
                  key={album?.id}
                  album={album}
              />
          ))}
        </div>
      </div>

  );
}
