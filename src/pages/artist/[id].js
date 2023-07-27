import React from 'react';
import { useRouter } from 'next/router'
import Artist from '../../components/Artist';
export default function id() {
  const router = useRouter();
  const id = router.query;
  console.log("hello"+id)
  return (
    <Artist id={id}/>
  )
}