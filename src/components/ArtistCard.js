import React from 'react';
import Link from 'next/link'
import Loader from "@/components/Loader";
import {useGetArtistDetailsQuery} from "@/redux/service";

export default function ArtistCard({ artist }) {

  if(!artist) return <Loader title={"Loading artist details..."}/>

  const {data: artistData, isFetching:isFetchingArtistDetails} =  useGetArtistDetailsQuery(artist.id)
  if(isFetchingArtistDetails) return <Loader title={"Loading artist details..."}/>

  return (
    <Link href={
      {
        pathname: `/artist/${artistData?.data?.id}`,
        query: artistData?.data, // the data
      }
    }>
      <div className="flex flex-col w-1.2 h-1/3  animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-30 group">
          <img
              alt="song_img"
              src={artistData?.data?.image ? artistData?.data?.image[2].link : '/images.png'}
              className="w-full rounded-full object-contain"
          />
        </div>
        <div className="mt-4 flex flex-col justify-center items-center">
          <p className="font-semibold text-lg text-dark-1 truncate">
            {artistData?.data?.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
