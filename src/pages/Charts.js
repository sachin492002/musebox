import React from 'react'
import ChartCard from '../components/ChartCard'
import {useSelector} from "react-redux";

export default function Charts() {


  const {homepageData} = useSelector((state) => state.player)||[];
  const charts = homepageData?.charts

    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Top Charts....</h1>
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {charts?.map((chart) => (
             <ChartCard key={chart.id} chart={chart} />
            ))}
          </div>
        </div>
      );
}
