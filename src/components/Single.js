import React from 'react';

export default function Single({song}) {
    const downloadSong = (downloadUrl,filename) => {
        fetch(downloadUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        });
    }
    
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <img
        className="w-full h-48 object-cover"
        src={song.image[2].link}
        alt={song.name}
      />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{song.name}</h2>
      <p className="text-gray-600">{song.duration}s</p>
    </div>
    <div className="px-4 pb-4">
      <audio controls className="w-full">
        <source src={song?.downloadUrl[2]?.link} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div> 
    <div className="px-4 pb-4">
      <button onClick={(e)=> {e.preventDefault();
        downloadSong(song.downloadUrl[2].link,song.name)}} className="text-blue-500 hover:text-blue-700 font-semibold">
        Download
      </button>
    </div>
  </div>
  );
}

// import React,{useState,useEffect} from 'react';
// import { useRouter } from 'next/router'
// export default function Single({id}) {
//     const [song, setsong] = useState(null);
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch(`https://musix-phi.vercel.app/songs?id=${id}`);
//             const data = await response.json();
//             setsong(data.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//             setsong([]); // Handle error by setting albums to an empty array
//           }
//         };
//         fetchData();
//       }, [id]);
//     const downloadSong = (downloadUrl,filename) => {
//         fetch(downloadUrl)
//         .then((response) => response.blob())
//         .then((blob) => {
//           const url = URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = filename;
//           a.click();
//           URL.revokeObjectURL(url);
//         });
//     }
    
    
//   return (
//     // <h1>Song</h1>
//     <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
//         <img
//         className="w-full h-48 object-cover"
//         src={song.image[2].link}
//         alt={song.name}
//       />
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">{song.name}</h2>
//       <p className="text-gray-600">{song.duration}s</p>
//     </div>
//     <div className="px-4 pb-4">
//       <audio controls className="w-full">
//         <source src={song.downloadUrl[2].link} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//     <div className="px-4 pb-4">
//       <button onClick={(e)=> {e.preventDefault();
//         downloadSong(song.downloadUrl[2].link,song.name)}} className="text-blue-500 hover:text-blue-700 font-semibold">
//         Download
//       </button>
//     </div>
//   </div>
//   );
// }
