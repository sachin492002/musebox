import React,{useState,useEffect} from 'react';
import Single from '../../components/Single';
import { useRouter } from 'next/router'
export default function id() {
    const [song, setsong] = useState(null);
    const router = useRouter();
    const id = router.query;
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://musix-phi.vercel.app/songs?id=${id.id}`);
            const data = await response.json();
            setsong(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
            setsong([]); // Handle error by setting albums to an empty array
          }
        };
        fetchData();
      }, [id]);
  
  return (
    // <h1>harami</h1>
    <div>
    {song ? (
      <Single song={song[0]}/>
    ) : (
      <div>Loading song</div>
    )}
  </div>
  );
}
