import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/PaginationSlice';
import detailPaginationReducer  from './slices/DetailPaginatinSlice';
import searchReducer from './slices/SearchSlice';
import filterReducer     from './slices/filterSlice'; 

export const store = configureStore({
  reducer: {
    pagination: paginationReducer, // Ensure this key matches the reducer name
    detailPagination : detailPaginationReducer,
    search: searchReducer,
    filter:     filterReducer,
  },
});
