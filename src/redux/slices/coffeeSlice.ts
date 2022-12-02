import { createSlice } from '@reduxjs/toolkit';

export const coffeeSlice = createSlice({
  name: 'coffee',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = coffeeSlice.actions;

export default coffeeSlice.reducer;
