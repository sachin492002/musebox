import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ChartCard from '../components/ChartCard'
import Loader from '../components/Loader';
import Link from 'next/link'

import { useGetHomePageQuery } from '../redux/service';

export default function Charts() {
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://musix-phi.vercel.app/modules?language=hindi,english');
        const data = await response.json();

        setCharts(data.data.charts);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCharts([]); // Handle error by setting albums to an empty array
      }
    };

    fetchData();
  }, []);


    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Top Charts....</h1>
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {charts?.map((chart) => (
             <ChartCard chart={chart} />
            ))}
          </div>
        </div>
      );
}
