// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { successToast, errorToast } from '../config/toastConfig';

// // Thunks for fetching issues, reasons, machines, and creating a ticket
// export const fetchIssues = createAsyncThunk('ticket/fetchIssues', async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/get-all-issues');
//     console.log("Response for issues", response.data.data)

//     return response.data.data;
//   } catch (error) {
//     errorToast('Failed to fetch issues');
//     throw error;
//   }
// });

// export const fetchReasons = createAsyncThunk('ticket/fetchReasons', async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/get-reasons');
//     console.log("Response for reason", response.data.data)
//     return response.data.data;
//   } catch (error) {
//     errorToast('Failed to fetch reasons');
//     throw error;
//   }
// });

// export const fetchMachines = createAsyncThunk('ticket/fetchMachines', async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/get-all-machines');
//     console.log("Response for machines", response.data.data)

//     return response.data.data;
//   } catch (error) {
//     errorToast('Failed to fetch machines');
//     throw error;
//   }
// });

// export const createTicket = createAsyncThunk('ticket/createTicket', async (ticketData, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/tickets', ticketData);
//     console.log("Response for tickets", response.data.data)

//     successToast('Ticket created successfully');
//     return response.data.data;
//   } catch (error) {
//     errorToast('Failed to create ticket');
//     return rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// const ticketSlice = createSlice({
//   name: 'ticket',
//   initialState: {
//     issues: [],
//     reasons: [],
//     machines: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch issues
//       .addCase(fetchIssues.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchIssues.fulfilled, (state, action) => {
//         state.loading = false;
//         state.issues = action.payload;
//       })
//       .addCase(fetchIssues.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Fetch reasons
//       .addCase(fetchReasons.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchReasons.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reasons = action.payload;
//       })
//       .addCase(fetchReasons.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Fetch machines
//       .addCase(fetchMachines.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMachines.fulfilled, (state, action) => {
//         state.loading = false;
//         state.machines = action.payload;
//       })
//       .addCase(fetchMachines.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Create ticket
//       .addCase(createTicket.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createTicket.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(createTicket.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default ticketSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast, errorToast } from "../config/toastConfig";

// Thunks for fetching issues, reasons, machines, and creating a ticket
export const fetchIssues = createAsyncThunk(
  "ticket/fetchIssues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://10.127.21.103:5000/api/get-all-issues"
      );
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch issues"
      );
    }
  }
);

export const fetchReasons = createAsyncThunk(
  "ticket/fetchReasons",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://10.127.21.103:5000/api/get-reasons-by-issue/${issueId}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch reasons for the issue");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reasons for the issue"
      );
    }
  }
);


export const fetchMachines = createAsyncThunk(
  "ticket/fetchMachines",
  async (centreId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); // Access token from the Redux state
      const token = auth?.user?.token; // Extract token from user data

      if (!token) {
        throw new Error("No valid token provided");
      }

      // Ensure centreId is provided
      if (!centreId) {
        throw new Error("Centre ID is required");
      }

      const response = await axios.get(
        `http://10.127.21.103:5000/api/machines/centre/${centreId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );

      if (response.data.success) {
        return response.data.data; // Return machine data
      } else {
        return rejectWithValue("Failed to fetch machines");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch machines"
      );
    }
  }
);

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); // Get token from Redux state
      const token = auth?.user?.token; // Access the token from the user data

      if (!token) {
        throw new Error("No valid token provided");
      }

      // Make the POST request with the Authorization header
      const response = await axios.post(
        "http://10.127.21.103:5000/api/create-tickets",
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );

      successToast("Ticket created successfully");
      return response.data.data;
    } catch (error) {
      // If it's a validation error, return the validation messages
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data.errors); // Return validation errors
      }
      errorToast("Failed to create ticket");
      return rejectWithValue(error.response?.data || "Failed to create ticket");
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    issues: [],
    reasons: [],
    machines: [],
    loading: false,
    error: null,
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
        state.error = action.payload;
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
          ? action.payload.map(err => err.msg).join(', ') // Handling validation errors
          : action.payload || "Failed to create ticket";
      })
  },
});

export default ticketSlice.reducer;
