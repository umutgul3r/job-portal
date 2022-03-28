import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import tokenReducer from "../reducers/tokenReducer";
import getUsers from "../reducers/getAllUsers";
import productsReducer from "../reducers/productSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    getToken: tokenReducer,
    getAllUsers: getUsers,
    products: productsReducer,
  },
});
