import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all news with pagination
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

      // Only add search if it exists and is not empty
      if (search && search.trim() !== "") {
        params.append("search", search.trim());
      }
      
      // Only add section if it exists and is not "all"
      if (section && section !== "all" && section.trim() !== "") {
        params.append("section", section.trim());
      }

      const url = `http://localhost:8080/api/news?${params.toString()}`;
      console.log("=== API Request ===");
      console.log("URL:", url);
      console.log("Params:", { page, limit, search, section });

      const response = await axios.get(url);

      console.log("=== API Response ===");
      console.log(`Received ${response.data.length} items for page ${page}`);
      console.log("Sample item:", response.data[0]);

      return {
        data: response.data,
        page,
        hasMore: response.data.length === limit,
      };
    } catch (error) {
      console.error("=== API Error ===", error.message);
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
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to page 1
      state.hasMore = true;
      // Don't clear items here - let the fetch handle it
    },
    setSelectedSection: (state, action) => {
      console.log("Setting section to:", action.payload);
      state.selectedSection = action.payload;
      state.page = 1; // Reset to page 1
      state.hasMore = true;
      // Don't clear items here - let the fetch handle it
    },
    setPage: (state, action) => {
      state.page = action.payload;
      // Don't clear items here - let the fetch handle it
    },
    resetAllNews: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
      state.searchQuery = "";
      state.selectedSection = "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        // Clear items when starting to fetch
        state.items = [];
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;

        console.log("=== Processing fetched data ===");
        console.log("Raw data count:", action.payload.data.length);

        // Process and clean new items
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
            imageLink: normalizedImage,
            description: item.description?.replace(/^"|"$/g, "") || "",
            category: item.category?.replace(/^"|"$/g, "") || "",
          };
        });

        console.log("Clean items count:", cleanItems.length);
        console.log("Sample clean item:", cleanItems[0]);

        // Always replace items (pagination, not infinite scroll)
        state.items = cleanItems;
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
        state.items = [];
      });
  },
});

export const { setSearchQuery, setSelectedSection, setPage, resetAllNews } =
  allNewsSlice.actions;
export default allNewsSlice.reducer;