import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openPlayer:false,
  homepageData:null,
  topCharts:[],
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
  
    setopenPlayer:(state,action)=>{
      state.openPlayer = action.payload;
    }
    ,
    sethomepageData:(state,action)=>{
      state.homepageData = action.payload;
    },
    setTopCharts: (state,action)=>{
      state.topCharts = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      const index = action.payload;
      if (typeof index === 'number' && index >= 0 && index < state?.currentSongs?.length) {
        if (state?.currentSongs[index]?.track) {
          state.activeSong = state?.currentSongs[index]?.track;
        } else {
          state.activeSong = state?.currentSongs[index];
        }
        state.currentIndex = index;
        state.isActive = true;
      }
    },



    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId , setTopCharts,sethomepageData,setopenPlayer } = playerSlice.actions;

export default playerSlice.reducer;
