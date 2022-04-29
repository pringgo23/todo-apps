import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers";

export default configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
});
