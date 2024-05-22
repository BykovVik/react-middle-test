import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;