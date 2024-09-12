import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ticketReducer from './ticketSlice'
import userReduer from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReduer,
    ticket: ticketReducer,
  },
});

export default store;
