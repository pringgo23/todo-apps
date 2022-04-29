import { createSlice } from "@reduxjs/toolkit";

export const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },

  reducers: {
    saveTodo: (state, action) => {
      state.todos = [...action.payload];
    },
  },
});

export const { saveTodo } = todoReducer.actions;

export default todoReducer.reducer;
