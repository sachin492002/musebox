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
    getSongsBySearch: builder.query({ query: (searchTerm) => `search/songs?query=${searchTerm}&page=1&limit=40` }),
    getAlbumsBySearch:  builder.query({ query: (searchTerm) => `search/albums?query=${searchTerm}&page=1&limit=40` }),
    getArtistBySearch:  builder.query({ query: (searchTerm) => `search/artists?query=${searchTerm}&page=1&limit=40` }),
    getArtistDetails: builder.query({ query: (artistId) => `artists/?id=${artistId}` }),
    getSongDetails: builder.query({ query: (songid) => `${playlistDetailsBaseUrl}songs?id=${songid}` }),
    getArtistSongs: builder.query({ query: (artistid ) => `artists/${artistid}/songs?page=1` }),
    getArtistAlbums: builder.query({ query: ( artistid ) => `artists/${artistid}/albums?page=1` }),
    getAlbumDetails: builder.query({ query: ( albumid ) => `albums/?id=${albumid}` }),
    getPlaylistsBySearch : builder.query({ query: (searchTerm) => `search/playlists?query=${searchTerm}` }),
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
