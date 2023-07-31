import React from 'react';
import Link from 'next/link'
import Loader from "@/components/Loader";

export default function ChartCard({ chart }) {
  if(!chart?.id) <Loader title='loading playlist'/>
  return (
    <Link href={
      {
        pathname: `/chart/${chart?.id}`,
        query: chart,// the data
      }
    }>
    <div className="mx-auto w-full flex-wrap bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full  object-contain"
        src={chart.image[2].link}
        alt={chart.title}
      />
      <div className="p-4">
        <h2 className="truncate text-sm md:text-xl  font-semibold mb-2">{ (chart.name) ?chart?.name :chart?.title }</h2>
      </div>
    </div>
    </Link>
  );
}
