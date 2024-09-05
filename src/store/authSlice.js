import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { successToast, errorToast } from '../config/toastConfig';

// Thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://10.127.21.103:5000/api/login', credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || 'Login failed'); // Error toast notification
        return rejectWithValue(error.response.data);
      }
      errorToast('Network Error'); // Network error toast notification
      return rejectWithValue({ message: 'Network Error' });
    }
  }
);

// Thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://10.127.21.103:5000/api/register', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || 'Registration failed'); // Error toast notification
        return rejectWithValue(error.response.data);
      }
      errorToast('Network Error'); // Network error toast notification
      return rejectWithValue({ message: 'Network Error' });
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      successToast('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        successToast('Registered successfully!'); // Success toast notification for registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Login pending....");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log("Login fulfilled:", action.payload);
        successToast('Logged in successfully!'); // Success toast notification for login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        console.log("Login rejected:", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
