import React from 'react';
import { useRouter } from 'next/router'
import SingleAlbum from '../../components/SingleAlbum';
export default function id() {
  const router = useRouter();
  const album = router.query;
  return (
    <SingleAlbum album={album}/>
  )
}

