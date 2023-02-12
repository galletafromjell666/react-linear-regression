import { configureStore } from '@reduxjs/toolkit';
import linearRegressionReducer from '../src/features/regression/regressionSlice'
const store = configureStore({
    reducer: {
        CartessianPoints: linearRegressionReducer
    }
});
export default store;
