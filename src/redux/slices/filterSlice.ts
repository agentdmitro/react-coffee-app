import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchValue: '',
    categoryId: '',
    sortType: 'asc',
    sort: {
      name: 'популярністю',
      sort: 'rating',
    },
  },
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    changeSortType: (state) => {
      if (state.sortType === 'asc') {
        state.sortType = 'desc';
      } else {
        state.sortType = 'asc';
      }
    },
    setFilters: (state, action) => {
      state.categoryId = action.payload.activeCat;
      state.searchValue = action.payload.searchInputValue;
      state.sortType = action.payload.sortType;
      state.sort = action.payload.sort;
    },
  },
});

export const { changeCategory, setSort, changeSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
