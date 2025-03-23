import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice/authSlice.js';
import shopReducer from './slices/shopSlice/shopSlice'; 
import apartmentReducer from './slices/apartmentSlice/apartmentSlice';  
import updateReducer from './slices/updateSlice/updateSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,  
    apartment: apartmentReducer, 
    update: updateReducer, 
  },
});

export default store;
