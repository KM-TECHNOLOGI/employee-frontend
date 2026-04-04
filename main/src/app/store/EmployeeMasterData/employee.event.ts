import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Employee, EmployeeCreateRequest } from './employee.model';

export const employeeEvents = eventGroup({
  source: 'Employee API',
  events: {
    // Load Department Events
    loadEmployees: type<void>(),
    loadEmployeesSuccess: type<Employee[]>(),
    loadEmployeesFailed: type<{ error: unknown }>(),
    
    // Create Department Events
    createEmployee: type<EmployeeCreateRequest>(),
    createEmployeeSuccess: type<Employee>(),
    createEmployeeFailed: type<{ error: unknown }>(),

    //update Department Events
    updateEmployee: type<{ id: number; request: EmployeeCreateRequest }>(),
    updateEmployeeSuccess: type<Employee>(),
    updateEmployeeFailed: type<{ error: unknown }>(),
  },
});
