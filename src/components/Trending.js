import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from '../components/AlbumCard';
import Link from 'next/link'
export default function Trending() {
  const [trending, settrending] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://musix-phi.vercel.app/modules?language=hindi,english'
        );
        const data = await response.json();
        
        settrending(data.data.trending.albums);
        // console.log(trending[0])
      } catch (error) {
        console.error('Error fetching data:', error);
        settrending([]); // Handle error by setting albums to an empty array
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Trending -- Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trending?.map((album) => (
            
          <AlbumCard album={album}></AlbumCard>
        ))}
      </div>
    </div>
  );
}
