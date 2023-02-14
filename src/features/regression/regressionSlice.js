import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
 const linearRegressionSlice = createSlice({
  name: 'CartessianPoints',
  initialState: [],
  reducers: {
    addPoint: (state, action) => {
      const point = {
        id: uuidv4(),
        coordinates: action.payload,
      };
      state.push(point);
  },
}});

export const { addPoint } = linearRegressionSlice.actions;

export default linearRegressionSlice.reducer;
