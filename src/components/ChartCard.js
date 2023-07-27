import React from 'react';
import Link from 'next/link'
export default function ChartCard({ chart }) {
  
  return (
    <Link href={
      {
        pathname: `/chart/${chart.id}`,
        query: chart,// the data
      }
    }>
    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover"
        src={chart.image[2].link}
        alt={chart.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{chart.title}</h2>
        {/* <p className="text-gray-600">{chart.artists[0].name}</p> */}
      </div>
    </div>
    </Link>
  );
}