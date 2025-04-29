import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    type: '',  // '' means “all”
  },
  reducers: {
    setFilterType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { setFilterType } = filterSlice.actions;
export default filterSlice.reducer;
