import { createSlice } from '@reduxjs/toolkit';
import employeesData from '../data/employees.json';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: employeesData
  },
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    updateEmployee(state, action) {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    }
  }
});

export const { setEmployees, updateEmployee, addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;