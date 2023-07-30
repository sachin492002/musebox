import Search from '../components/Search';
import { useSelector } from 'react-redux';
import Albums from './Albums';
import Charts from './Charts';
import Trending from './Trending';
import MusicPlayer from '../components/MusicPlayer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Sidebar from '../components/Sidebar';
const Home = () => {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <Provider store={store}>


            <Trending />
            <Charts />
            <Albums />

    </Provider>
  );
};

export default Home;
