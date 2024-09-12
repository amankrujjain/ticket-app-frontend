import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast, errorToast } from "../config/toastConfig";

const API_URL = "http://localhost:5000";

// Helper function to get token from state
const getAuthToken = (getState) => {
  const { auth } = getState();
  return auth?.user?.token || null; // Return the token if available
};

// Fetch roles (only accessible by admin)
export const fetchRoles = createAsyncThunk(
  "user/fetchRoles",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);
      const response = await axios.get(`${API_URL}/api/roles`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      return response.data.role; // Return the roles data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Fetch centers (only accessible by admin)
export const fetchCentres = createAsyncThunk(
  "user/fetchCentres",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);
      const response = await axios.get(`${API_URL}/api/get-all-centres`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      return response.data.data; // Return the centers data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Register user (only accessible by admin)
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);
      const response = await axios.post(`${API_URL}/api/register`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      successToast("User created successfully");
      return response.data; // Return the registered user data
    } catch (error) {
      if (error.response && error.response.data.message) {
        errorToast("Problem occurred while creating a user");
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Fetch users
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);
      const response = await axios.get(`${API_URL}/api/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Fix missing space
        },
      });
      return response?.data?.user; // Return users
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  userInfo: null,
  roles: [],
  centres: [],
  users: [], // Changed from `user` to `users` for consistency
  isLoading: false,
  error: null,
  success: false,
  fetchLoading: false, // For fetching roles and centres
  fetchError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.roles = [];
      state.centres = [];
      state.users = []; // Ensure users state is reset
      state.fetchLoading = false;
      state.fetchError = null;
    },
  },
  extraReducers: (builder) => {
    // Register User Cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Fetch Roles Cases
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });

    // Fetch Centres Cases
    builder
      .addCase(fetchCentres.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCentres.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.centres = action.payload;
      })
      .addCase(fetchCentres.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });

    // Fetch Users Cases
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });
  },
});

// Export reset action
export const { resetState } = userSlice.actions;

// Export user reducer
export default userSlice.reducer;
