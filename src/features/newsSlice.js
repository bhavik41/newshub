import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching news using axios (debug logs added)
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    const url = 'https://news-aggregator-dpvh.onrender.com/api/news';
    try {
      console.log('fetchNews: starting request to', url);
      // validateStatus: return true so axios won't throw on non-2xx
      const res = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });
      console.log('fetchNews: status', res.status);
      console.log('fetchNews: res.data', res.data);

      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
      // server returned error payload — surface it
      return rejectWithValue(res.data || res.statusText || `Error ${res.status}`);
    } catch (err) {
      console.error('fetchNews: network/error', err);
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    topStories: [],
    trending: [],
    techArticles: [],
    politics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        // Expecting API to return { topStories, trending, techArticles, politics }
        state.topStories = action.payload.topStories || [];
        state.trending = action.payload.trending || [];
        state.techArticles = action.payload.techArticles || [];
        state.politics = action.payload.politics || [];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        // Use rejectWithValue message if available, otherwise fallback to action.error.message
        state.error = action.payload || action.error?.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
