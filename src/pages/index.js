import Albums from './Albums';
import Charts from './Charts';
import Trending from './Trending';
import Playlists from "@/pages/playlists";
import Head from 'next/head';

const Home = () => {
    return (
      <>
          <Head>
              <title>Museboxx</title>
              <link rel="icon" href="/favicon.jpg" />
          </Head>
            <Trending />
            <Charts />
            <Albums />
          <Playlists/>
        </>
  );
};

export default Home;
