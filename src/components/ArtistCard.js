import React from 'react';
import Link from 'next/link'
import Loader from "@/components/Loader";
import {useGetArtistDetailsQuery} from "@/redux/service";

export default function ArtistCard({ artist }) {

  if(!artist) return <Loader title={"Loading artist details..."}/>

  const {data: artistData, isFetching:isFetchingArtistDetails} =  useGetArtistDetailsQuery(artist.id)
  if(isFetchingArtistDetails) return <Loader title={"Loading artist details..."}/>
  console.log(artist)
  return (
    <Link href={
      {
        pathname: `/artist/${artistData?.data?.id}`,
        query: artistData?.data, // the data
      }
    }>
      <div className="flex flex-col w-1.2 justify-center animate-slideup rounded-lg cursor-pointer">
        <img alt={artistData?.data?.image[2].link} src={artistData?.data?.image ? artistData?.data?.image[2].link : '/images.png' } className="w-full rounded-full object-contain" />
        <p className="mt-4 font-semibold text-lg text-dark-1 p-8 truncate">
          {artistData?.data?.name}
        </p>
      </div>

    </Link>
  );
}
