import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';


export const newsSearch = createAsyncThunk(
  'news/search',
  async (search) => {
    try {
      let headers = {};
      if (localStorage.user != undefined) {
        headers = {Authorization: `Bearer ${localStorage.getItem('user')}`}
      }
      const response = await axios.post('/api/search', search, {headers});
      // console.log('SEARCH ===>', response.data)
      return response.data;
    } catch(err) {
      throw err.response.data;
    }
  }
);

export const getNews = createAsyncThunk(
  'news/result',
  async () => {
    try {
      const response = await axios.get('/api/result?limit=50');
      // console.log('ALL NEWS ===>', response.data)
      return response.data;
    } catch(err) {
      throw err.response.data;
    }
  }
);

export const getSuggestions = createAsyncThunk(
  'news/suggestions', 
  async () => {
    try {
      let headers = {};
      if (localStorage.user != undefined) {
        headers = {Authorization: `Bearer ${localStorage.getItem('user')}`}
      }
      const response = await axios.post(`/api/auth/suggestions`, null, {headers})
      // console.log('SUGGESTIONS ===>', response.data)
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const getOneNew = createAsyncThunk(
  'news/getnew', 
  async (id) => {
    try {
      // console.log(id)
      const response = await axios.get(`/api/getnew/${id}`)
      // console.log(response.data)
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const getOptions = createAsyncThunk(
  'news/options',
  async () => {
    try {
      const response = await axios.get(`/api/options`);
      // console.log('OPTIONS ===>', response.data)
      return response.data;
    } catch(err) {
      throw err.response.data;
    }
  }
)

const newsSlice = createSlice ({
  name: 'news',
  initialState: {
    search: [],
    suggestions: [],
    news: [],
    news: [],
    new: '',
    options: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //search
    .addCase(newsSearch.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(newsSearch.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.search = action.payload;
      state.error = null
    })
    .addCase(newsSearch.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //get search results
    .addCase(getNews.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(getNews.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.news = action.payload;
      state.error = null
    })
    .addCase(getNews.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //get suggestions
    .addCase(getSuggestions.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(getSuggestions.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.suggestions = action.payload;
      state.error = null
    })
    .addCase(getSuggestions.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //get one new
    .addCase(getOneNew.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(getOneNew.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.new = action.payload;
      state.error = null
    })
    .addCase(getOneNew.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
    //get options
    .addCase(getOptions.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    .addCase(getOptions.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.options = action.payload;
      state.error = null
    })
    .addCase(getOptions.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message;
    })
  }
});

export default newsSlice.reducer;