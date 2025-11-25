import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ⭐ NEW — AutoComplete API call
export const fetchSuggestions = createAsyncThunk(
  "allNews/fetchSuggestions",
  async (prefix, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/autocomplete/suggest",
        prefix,
        { headers: { "Content-Type": "text/plain" } }
      );
      return response.data;
    } catch (error) {
      console.error("AutoComplete Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ⭐ Existing — fetch news
export const fetchAllNews = createAsyncThunk(
  "allNews/fetchAllNews",
  async (
    { page = 1, limit = 30, search = "", section = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search && search.trim() !== "") params.append("search", search.trim());
      if (section && section !== "all" && section.trim() !== "")
        params.append("section", section.trim());

      const url = `http://localhost:8080/api/news?${params.toString()}`;
      const response = await axios.get(url);

      return {
        data: response.data,
        page,
        hasMore: response.data.length === limit,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const allNewsSlice = createSlice({
  name: "allNews",
  initialState: {
    items: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
    searchQuery: "",
    selectedSection: "all",

    // ⭐ AutoComplete states
    suggestions: [],
    showSuggestions: false,
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
      state.page = 1;
      state.hasMore = true;
    },

    // ⭐ NEW reducer controls
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.showSuggestions = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ⭐ News fetching
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;
        const cleanItems = action.payload.data.map((item) => {
          const normalizedImage =
            item.imageLink || item.image || item.img || item.urlToImage || "";

          return {
            ...item,
            title: item.title?.replace(/^"|"$/g, "") || "",
            source: item.source?.replace(/^"|"$/g, "") || "",
            link: item.link?.replace(/^"|"$/g, "") || "",
            date: item.date?.replace(/^"|"$/g, "") || "",
            section: item.section?.replace(/^"|"$/g, "") || "",
            image: normalizedImage,
            description: item.description?.replace(/^"|"$/g, "") || "",
            category: item.category?.replace(/^"|"$/g, "") || "",
          };
        });

        state.items = cleanItems;
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
        state.items = [];
      })

      // ⭐ AutoComplete handling
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload || [];
        state.showSuggestions = true;
      })
      .addCase(fetchSuggestions.rejected, (state) => {
        state.suggestions = [];
        state.showSuggestions = false;
      });
  },
});

export const { setSearchQuery, setSelectedSection, clearSuggestions } =
  allNewsSlice.actions;

export default allNewsSlice.reducer;
