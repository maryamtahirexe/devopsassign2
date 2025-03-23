// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchOwner = createAsyncThunk(
//   "owner/fetchOwner",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://54.227.97.217:5000/owner");
//       console.log(response.data._id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const updateOwner = createAsyncThunk(
//   "owner/updateOwner",
//   async ({ id, email, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://54.227.97.217:5000/owner");
//       const id = response.data._id;
//       const responses = await axios.put(`http://54.227.97.217:5000/owner/${id}`, {
//         email,
//         password: newPassword,
//       });
//       return responses.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const initialState = {
//   owner: null,
//   loading: false,
//   error: null,
//   message: null,
// };

// const updateSlice = createSlice({
//   name: "update",
//   initialState,
//   reducers: {
//     clearMessage: (state) => {
//       state.message = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOwner.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOwner.fulfilled, (state, action) => {
//         state.loading = false;
//         state.owner = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchOwner.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(updateOwner.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateOwner.fulfilled, (state, action) => {
//         state.loading = false;
//         state.owner = action.payload.owner;
//         state.error = null;
//         state.message = "Owner updated successfully";
//       })
//       .addCase(updateOwner.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearMessage, clearError } = updateSlice.actions;

// export default updateSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API} from "../../../utils/api.js"; // Ensure you have an API instance configured

export const fetchOwner = createAsyncThunk(
  "owner/fetchOwner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/owner");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOwner = createAsyncThunk(
  "owner/updateOwner",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const fetchResponse = await API.get("/owner");
      const id = fetchResponse.data._id;
      const updateResponse = await API.put(`/owner/${id}`, {
        email,
        password: newPassword,
      });
      return updateResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  owner: null,
  loading: false,
  error: null,
  message: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
        state.error = null;
      })
      .addCase(fetchOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
        state.error = null;
        state.message = "Owner updated successfully";
      })
      .addCase(updateOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, clearError } = updateSlice.actions;

export default updateSlice.reducer;

