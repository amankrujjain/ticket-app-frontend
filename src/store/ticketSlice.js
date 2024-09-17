import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast, errorToast } from "../config/toastConfig";

// Dynamically set API URL based on environment
// const OFFICE_API_URL = 'http://10.127.21.103:5000';
// const LOCAL_API_URL = 'http://localhost:5000';
const API_URL =process.env.REACT_APP_LOCAL_API_URL

// Fetch Issues
export const fetchIssues = createAsyncThunk(
  "ticket/fetchIssues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/get-all-issues`);
      if (response.data.success) {
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
      const response = await axios.get(`${API_URL}/api/get-reasons-by-issue/${issueId}`);
      if (response.data.success) {
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

      const response = await axios.get(`${API_URL}/api/machines/centre/${centreId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
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

      const response = await axios.post(`${API_URL}/api/create-tickets`, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

      const response = await axios.post(`${API_URL}/api/my-open-tickets`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
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

      const response = await axios.post(`${API_URL}/api/my-closed-tickets`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
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

export const fetchTicketDetails = createAsyncThunk(
  "ticket/fetchTicketDetails",
  async (ticketId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("Please login again");
        throw new Error("No valid token provided");
      }

      const response = await axios.get(`${API_URL}/api/get-ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        errorToast("Failed to fetch ticket details");
        return rejectWithValue("Failed to fetch ticket details");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch ticket details");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch ticket details");
    }
  }
);

export const fetchAllTickets = createAsyncThunk('tickets/fetchAllTickets', async(_,{getState,rejectWithValue})=>{
  try {
    const {auth} = getState();
    const token = auth?.user?.token;

    if(!token){
      errorToast('Please login again');
      throw new Error("No valid token provided");

    }
    const response = await axios.get(`${API_URL}/api/tickets`,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });

    if(response.data.success){
      return response.data.data;
    }else{
      errorToast("Problem occured while fetching tickets");
      return rejectWithValue('Failed to fetch tickets');
    }
  } catch (error) {
    errorToast(error.response?.data?.message || 'Failed to fetch tickets');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
  }
});

// Close Ticket
export const closeTicket = createAsyncThunk(
  "ticket/closeTicket",
  async (ticketId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      if (!token) {
        errorToast("No valid token provided");
        throw new Error("No valid token provided");
      }

      const response = await axios.patch(`${API_URL}/api/tickets/${ticketId}/close`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successToast("Ticket closed successfully");
      return response.data.data;  // Returning the closed ticket data
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to close ticket");
      return rejectWithValue(error.response?.data?.message || "Failed to close ticket");
    }
  }
);


// Ticket Slice
const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    issues: [],
    reasons: [],
    machines: [],
    allTickets:[],
    openTickets: [],
    closedTickets: [],
    ticketDetails: null,  // Add state for single ticket details
    loadingTicketDetails: false,  // Add loading state for ticket details
    errorTicketDetails: null,  // Add error state for ticket details
    loadingOpenTickets: false,
    loadingClosedTickets: false,
    loadingAllTickets: false,
    errorAllTickets: null,
    errorOpenTickets: null,
    errorClosedTickets: null,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTicketDetails.pending, (state) => {
      state.loadingTicketDetails = true;
      state.errorTicketDetails = null;
    })
    .addCase(fetchTicketDetails.fulfilled, (state, action) => {
      state.loadingTicketDetails = false;
      state.ticketDetails = action.payload;
    })
    .addCase(fetchTicketDetails.rejected, (state, action) => {
      state.loadingTicketDetails = false;
      state.errorTicketDetails = action.payload;
    })
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
          ? action.payload.map((err) => err.msg).join(", ")
          : action.payload || "Failed to create ticket";
      })
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
      })
      .addCase(fetchAllTickets.pending, (state)=>{
        state.loadingAllTickets = true;
        state.errorAllTickets = null
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.loadingAllTickets = false;
        state.allTickets = action.payload;  // Save tickets in state
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loadingAllTickets = false;
        state.errorAllTickets = action.payload;  // Store error
      })
      .addCase(closeTicket.pending, (state) => {
        state.loadingTicketDetails = true;
        state.errorTicketDetails = null;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.loadingTicketDetails = false;
        state.ticketDetails = action.payload;  // Update the ticket details with the closed status
        successToast("Ticket closed successfully");
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.loadingTicketDetails = false;
        state.errorTicketDetails = action.payload;  // Set the error
        errorToast("Failed to close ticket");
      });
      
      ;
  },
});

export default ticketSlice.reducer;
