import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import newsReduser from './newsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReduser
  }
});

export default store;