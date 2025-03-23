import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API} from "../../../utils/api.js"; 

export const addProperty = createAsyncThunk(
  "property/addProperty",
  async ({ propertyType, formData }, { rejectWithValue }) => {
    try {
      const apiEndpoint =
        propertyType === "Apartment" ? "/apartments" : "/shops";
      const response = await API.post(apiEndpoint, formData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    isLoading: false,
    property: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.property = action.payload;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
