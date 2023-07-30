import React,{useState,useEffect} from 'react';
import Single from '../../components/Single';
import { useRouter } from 'next/router'
import SingleSong from "@/components/SingleSong";

export default function id() {
    const [song, setsong] = useState(null);
    const router = useRouter();
    const id = router.query.id;
  return (
    <div>
      <SingleSong song={{song:id}}/>
  </div>
  );
}
