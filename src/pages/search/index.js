import React from 'react';
import {useRouter} from 'next/router';
import {
  useGetAlbumsBySearchQuery,
  useGetArtistBySearchQuery,
  useGetPlaylistsBySearchQuery,
  useGetSongsBySearchQuery
} from '@/redux/service'
import Loader from "@/components/Loader";
import {useSelector} from "react-redux";
import SearchResults from "@/components/SearchResults";

export default function index() {
  const router = useRouter();
  const searchTerm = router.query.searchTerm;
  if(!searchTerm) return <Loader title={"Loading artist details..."}/>
  const searchItem = decodeURIComponent(searchTerm);
  const {data: artistData, isFetching:isFetchingArtistDetails} =  useGetArtistBySearchQuery(searchTerm)
  const {data:songsData, isFetching:isFetchingArtistSongs} =  useGetSongsBySearchQuery(searchTerm)
  const {data:albumsData, isFetching:isFetchingArtistAlbums} =  useGetAlbumsBySearchQuery(searchTerm)
  const {data:playlistsData, isFetching:isFetchingPlaylist} =  useGetPlaylistsBySearchQuery(searchTerm)
  if (isFetchingArtistDetails || isFetchingArtistSongs || isFetchingArtistAlbums||isFetchingPlaylist) return <Loader title={"Loading artist details..."}/>
  const artists = artistData?.data?.results|| {};
  const songs = songsData?.data?.results || [];
  const albums = albumsData?.data?.results || [];
  const playlists = playlistsData?.data?.results || [];
  console.log(playlistsData)
  return (
      <SearchResults data={{artists,songs,albums,playlists,searchTerm}}/>
  );
}
