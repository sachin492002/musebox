import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetAlbumsBySearchQuery,
  useGetArtistBySearchQuery,
  useGetPlaylistsBySearchQuery,
  useGetSongsBySearchQuery,
} from '@/redux/service';
import Loader from '@/components/Loader';
import SearchResults from '@/components/SearchResults';

export default function index() {
  const router = useRouter();
  const searchTerm = router.query.searchTerm;
  const [isLoading, setIsLoading] = useState(true);
  const [artistsData, setArtists] = useState([]);
  const [songsData, setSongs] = useState([]);
  const [albumsData, setAlbums] = useState([]);
  const [playlistsData, setPlaylists] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setIsLoading(false);
      return;
    }
    const searchItem = decodeURIComponent(searchTerm);

    async function fetchAllPages(type, searchTerm, page = 1, limit = 20) {
      const url = `${process.env.NEXT_PUBLIC_API2}search/${type}?query=${searchTerm}&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();

      if (type === 'songs') {
        setSongs((prevSongs) => [...prevSongs, ...data?.data?.results]);
      } else if (type === 'albums') {
        setAlbums((prevAlbums) => [...prevAlbums, ...data?.data?.results]);
      } else if (type === 'playlists') {
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...data?.data?.results]);
      } else if (type === 'artists') {
        setArtists((prevArtists) => [...prevArtists, ...data?.data?.results]);
      }

      if (data?.data?.total - 20 * page >= 0) {
        await fetchAllPages(type, searchTerm, page + 1, limit);
      }
    }

    async function fetchData() {
      await Promise.all([
        fetchAllPages('songs', searchTerm),
        fetchAllPages('albums', searchTerm),
        fetchAllPages('playlists', searchTerm),
        fetchAllPages('artists', searchTerm),
      ]);

      setIsLoading(false);
    }

    fetchData();
  }, [searchTerm]);

  if (isLoading) return <Loader title={'Loading artist details...'} />;

  return <SearchResults data={{ songsData,albumsData,artistsData,playlistsData, searchTerm }} />;
}
