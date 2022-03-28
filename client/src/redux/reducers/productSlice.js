import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  itemDetail: [],
  status: null,
  result: "",
  page: 4,
};

export const deleteProducts = createAsyncThunk(
  "delete/Product",
  async ([id, token]) => {
    try {
      await axios.delete(`/api/job/${id}`, {
        headers: { Authorization: token },
      });
    } catch (err) {
      console.log("silme çalıştı");
      alert(err.response.data.msg);
    }
  }
);

export const productDetailFetch = createAsyncThunk(
  "product/Detail",
  async (id) => {
    try {
      const productDetail = await axios.get(`/api/job/detail/${id}`);
      return productDetail.data;
    } catch (err) {
      alert(err.response.data.msg);
    }
  }
);

export const jobsFetch = createAsyncThunk(
  "users/productsFetch",
  async ([where, sort, category]) => {
    const res = await axios.post(`api/jobs`, {
      title: where,
      sort: sort,
      category: category,
    });
    return res.data;
  }
);

export const accepted = createAsyncThunk(
  "users/accepted",
  async ([id, postUser, cv, job_title]) => {
    await axios.post(`/api/job-status/${id}`, { postUser, cv, job_title });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pages: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [jobsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [jobsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [jobsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productDetailFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productDetailFetch.fulfilled]: (state, action) => {
      state.itemDetail = action.payload;
      state.status = "success";
    },
    [productDetailFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { pages } = productsSlice.actions;
export default productsSlice.reducer;
