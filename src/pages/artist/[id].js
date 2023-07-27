import React from 'react';
import { useRouter } from 'next/router'
import Artist from '../../components/Artist';
export default function id() {
  const router = useRouter();
  const artist = router.query;
  console.log("hello"+artist)
  return (
    <Artist prop={artist}/>
  )
}