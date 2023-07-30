import React from 'react';
import { useRouter } from 'next/router'
import Artist from '../../components/Artist';
export default function id() {
  const router = useRouter();
  const artistId = router.query.id;
  return (
    <Artist artistId={artistId}/>
  )
}