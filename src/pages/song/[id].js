import React, {useState} from 'react';
import {useRouter} from 'next/router'
import SingleSong from "@/components/SingleSong";
import {useSelector} from 'react-redux'

export default function id() {
    const [song, setsong] = useState(null);
    const router = useRouter();
    const { activeSong, isPlaying } = useSelector((state) => state.player)|| {};
    const id = router.query.id;
  return (
    <div>
      <SingleSong song={{song:id}} activeSong={activeSong}/>
  </div>
  );
}
