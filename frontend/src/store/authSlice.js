import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      return response.data;
    } catch(err) {
      throw err.response.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      // console.log(response.data)
      return response.data;
    } catch(err) {
      // console.log(err.response.data)
      throw err.response.data;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser', 
  async () => {
    try {
      let headers = {};
      if (localStorage.user != undefined) {
        headers = {Authorization: `Bearer ${localStorage.getItem('user')}`}
      }
      const response = await axios.post('/api/auth/delete', null, {headers})
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      let headers = {};
      if (localStorage.user != undefined) {
        headers = {Authorization: `Bearer ${localStorage.getItem('user')}`}
      }
      const response = await axios.post('/api/auth/logout', null, {
        headers
      });
      return response.data;
    } catch(err) {
      throw err.response.data;
    }
  }
);

const authSlice = createSlice ({
  name: 'auth',
  initialState: {
    token: null,
    expires_in: null,
    token_type: null,
    status: 'idle',
    error: null
  },

  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //register
    .addCase(registerUser.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.token = action.payload.access_token;
      state.error = null
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //login
    .addCase(loginUser.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.token = action.payload.access_token;
      state.error = null
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //logout
    .addCase(logoutUser.pending, (state, action) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.token = null;
      state.error = null;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    })
    //delete account
    .addCase(deleteUser.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.token = null;
      state.error = null;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
  }
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;