import React from 'react';
import AlbumCard from '../components/AlbumCard';
import {useSelector} from "react-redux";

export default function Albums() {

  const {homepageData} = useSelector((state) => state.player)||[];
  const albums = homepageData?.albums;

  return (
      <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Top Albums...</h1>
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">

          {albums?.map((album, i) => (
              <AlbumCard
                  key={album?.id}
                  album={album}
              />
          ))}
        </div>
      </div>

  );
}
