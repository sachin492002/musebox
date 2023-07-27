import Search from '../components/Search'
// import BooksByGenre from '../components/Books'
import Albums from '../components/Albums'
import Charts from '../components/Charts'
import Trending from '../components/Trending'
const Home = () => {
  
  return( <div>
    <Search/>
    {/* <BooksByGenre/> */}
    <Albums/><Charts/><Trending/>
    </div>);
};

export default Home;
