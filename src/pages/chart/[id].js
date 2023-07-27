import React from 'react';
import { useRouter } from 'next/router'
import Chart from '../../components/Chart';
export default function id() {
  const router = useRouter();
  const chart = router.query;
  return (
    <Chart chart={chart}/>
  )
}

