import '/styles/globals.css'
import Layout from '../components/Layout'
import { Provider ,useSelector} from 'react-redux';
import { store } from '../redux/store';

import MusicPlayer from "@/components/MusicPlayer";

function MyApp({ Component, pageProps }) {

  return <>
  <Provider store={store}>
    
    <Layout>
      <Component {...pageProps} />
    </Layout>
   
  </Provider>
  </>
}

export default MyApp
