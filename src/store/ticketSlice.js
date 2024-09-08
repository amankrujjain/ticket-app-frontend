import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast, errorToast } from "../config/toastConfig";
const API_URL ='http://localhost:5000';

// Fetch Issues
export const fetchIssues = createAsyncThunk(
  "ticket/fetchIssues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/get-all-issues`
      );
      if (response.data.success) {
        // successToast("Issues fetched successfully");
        return response.data.data;
      } else {
        errorToast("Failed to fetch issues");
        return rejectWithValue("Failed to fetch issues");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch issues");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch issues");
    }
  }
);

// Fetch Reasons based on Issue ID
export const fetchReasons = createAsyncThunk(
  "ticket/fetchReasons",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/get-reasons-by-issue/${issueId}`
      );
      if (response.data.success) {
        // successToast("Reasons fetched successfully");
        return response.data.data;
      } else {
        errorToast("Failed to fetch reasons for the issue");
        return rejectWithValue("Failed to fetch reasons for the issue");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch reasons");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reasons");
    }
  }
);

// Fetch Machines based on Centre ID
export const fetchMachines = createAsyncThunk(
  "ticket/fetchMachines",
  async (centreId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("No valid token provided");
        throw new Error("No valid token provided");
      }

      if (!centreId) {
        errorToast("Centre ID is required");
        throw new Error("Centre ID is required");
      }

      const response = await axios.get(
        `${API_URL}/api/machines/centre/${centreId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // successToast("Machines fetched successfully");
        return response.data.data;
      } else {
        errorToast("Failed to fetch machines");
        return rejectWithValue("Failed to fetch machines");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch machines");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch machines");
    }
  }
);

// Create Ticket
export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("No valid token provided");
        throw new Error("No valid token provided");
      }

      const response = await axios.post(
        `${API_URL}/api/create-tickets`,
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      successToast("Ticket created successfully");
      return response.data.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        errorToast("Failed to create ticket");
        return rejectWithValue(error.response.data.errors);
      }
      errorToast(error.response?.data || "Failed to create ticket");
      return rejectWithValue(error.response?.data || "Failed to create ticket");
    }
  }
);

// Fetch Open Tickets
export const fetchOpenTickets = createAsyncThunk(
  "ticket/fetchOpenTickets",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("Please login again");
        throw new Error("No valid token provided");
      }

      const response = await axios.post(
        `${API_URL}/api/my-open-tickets`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // successToast("Open tickets fetched successfully");
        return response.data.data;
      } else {
        errorToast("Failed to fetch open tickets");
        return rejectWithValue("Failed to fetch open tickets");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch open tickets");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch open tickets");
    }
  }
);

// Fetch Closed Tickets
export const fetchClosedTickets = createAsyncThunk(
  "ticket/fetchClosedTickets",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("Please login again");
        throw new Error("No valid token provided");
      }

      const response = await axios.post(
        `${API_URL}/api/my-closed-tickets`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // successToast("Closed tickets fetched successfully");
        return response.data.data;
      } else {
        errorToast("Failed to fetch closed tickets");
        return rejectWithValue("Failed to fetch closed tickets");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch closed tickets");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch closed tickets");
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    issues: [],
    reasons: [],
    machines: [],
    openTickets: [],
    closedTickets: [],
    loadingOpenTickets: false,
    loadingClosedTickets: false,
    errorOpenTickets: null,
    errorClosedTickets: null,
    // You can add more specific loading/error states if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch issues
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch issues";
      })
      // Fetch reasons
      .addCase(fetchReasons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReasons.fulfilled, (state, action) => {
        state.loading = false;
        state.reasons = action.payload;
      })
      .addCase(fetchReasons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reasons";
      })
      // Fetch machines
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch machines";
      })
      // Create ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = Array.isArray(action.payload)
          ? action.payload.map(err => err.msg).join(", ") // Handling validation errors
          : action.payload || "Failed to create ticket";
      })
      // Fetch open tickets
      .addCase(fetchOpenTickets.pending, (state) => {
        state.loadingOpenTickets = true;
        state.errorOpenTickets = null;
      })
      .addCase(fetchOpenTickets.fulfilled, (state, action) => {
        state.loadingOpenTickets = false;
        state.openTickets = action.payload;
      })
      .addCase(fetchOpenTickets.rejected, (state, action) => {
        state.loadingOpenTickets = false;
        state.errorOpenTickets = action.payload;
      })
      // Fetch closed tickets
      .addCase(fetchClosedTickets.pending, (state) => {
        state.loadingClosedTickets = true;
        state.errorClosedTickets = null;
      })
      .addCase(fetchClosedTickets.fulfilled, (state, action) => {
        state.loadingClosedTickets = false;
        state.closedTickets = action.payload;
      })
      .addCase(fetchClosedTickets.rejected, (state, action) => {
        state.loadingClosedTickets = false;
        state.errorClosedTickets = action.payload;
      });
  },
});

export default ticketSlice.reducer;
