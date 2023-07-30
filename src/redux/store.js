import { configureStore } from '@reduxjs/toolkit';

import { Api } from './service';
import playerReducer from './playerSlice';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
});
