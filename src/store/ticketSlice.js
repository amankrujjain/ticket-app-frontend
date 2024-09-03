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
        "http://localhost:5000/api/get-all-issues"
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-reasons");
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reasons"
      );
    }
  }
);

export const fetchMachines = createAsyncThunk(
  "ticket/fetchMachines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-all-machines"
      );
      if (response.data.success) {
        return response.data.data;
      }else{
        return rejectWithValue("Failed to fetch");
      };
    } catch (error) {
      return rejectWithValue(
      error.response?.data?.message || "Failed to fetch machines"
      )
    }
  }
);

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tickets", ticketData);
      successToast("Ticket created successfully");
      return response.data.data;
    } catch (error) {
      errorToast("Failed to create ticket");
      return rejectWithValue(error.response.data);
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
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
