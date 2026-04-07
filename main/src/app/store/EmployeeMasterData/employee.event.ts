import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Employee, EmployeeCreateRequest, PageResponse } from './employee.model';

export const employeeEvents = eventGroup({
  source: 'Employee API',
  events: {
    // Load Employee Events
    loadEmployees: type<void>(),
    loadEmployeesSuccess: type<PageResponse<Employee>>(),
    loadEmployeesFailed: type<{ error: unknown }>(),

    // Create Employee Events
    createEmployee: type<EmployeeCreateRequest>(),
    createEmployeeSuccess: type<Employee>(),
    createEmployeeFailed: type<{ error: unknown }>(),

    //update Employee Events
    updateEmployee: type<{ id: number; request: EmployeeCreateRequest }>(),
    updateEmployeeSuccess: type<Employee>(),
    updateEmployeeFailed: type<{ error: unknown }>(),

    //delete Employee Events
    deleteEmployee: type<{ id: number }>(),
    deleteEmployeeSuccess: type<Employee>(),
    deleteEmployeeFailed: type<{ error: unknown }>(),
  },
});
