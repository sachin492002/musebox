import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const playlistDetailsBaseUrl = process.env.NEXT_PUBLIC_API2;
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API1,
  }),
  endpoints: (builder) => ({
    getHomePage: builder.query({ query: () => 'modules?language=hindi,english,punjabi, tamil, telugu, marathi, gujarati, bengali, kannada, bhojpuri, malayalam, urdu, haryanvi, rajasthani, odia, assamese' }),
    getTopCharts: builder.query({ query: () => 'playlists?id=1108582051' }),
    getSongsBySearch: builder.query({ query: (searchTerm,page) => `search/songs?query=${searchTerm}&page=${page?page:1}&limit=20` }),
    getAlbumsBySearch:  builder.query({ query: (searchTerm,page) => `search/albums?query=${searchTerm}&page=${page?page:1}&limit=20` }),
    getArtistBySearch:  builder.query({ query: (searchTerm,page) => `search/artists?query=${searchTerm}&page=${page?page:1}&limit=20` }),
    getArtistDetails: builder.query({ query: (artistId) => `artists/?id=${artistId}` }),
    getSongDetails: builder.query({ query: (songid) => `${playlistDetailsBaseUrl}songs?id=${songid}` }),
    getArtistSongs: builder.query({ query: (artistid ) => `artists/${artistid}/songs` }),
    getArtistAlbums: builder.query({ query: ( artistid ) => `artists/${artistid}/albums?page=1` }),
    getAlbumDetails: builder.query({ query: ( albumid ) => `albums/?id=${albumid}` }),
    getPlaylistsBySearch : builder.query({ query: (searchTerm,page) => `search/playlists?query=${searchTerm}&${page?page:1}&limit=20` }),
    getPlaylistDetails: builder.query({ query: ( albumid ) => `playlists/?id=${albumid}` }),
    
  }),
});

export const {
  useGetHomePageQuery,
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetAlbumsBySearchQuery,
  useGetArtistBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetArtistSongsQuery,
  useGetArtistAlbumsQuery,
  useGetAlbumDetailsQuery,
  useGetPlaylistsBySearchQuery,
  useGetPlaylistDetailsQuery,
} = Api;
