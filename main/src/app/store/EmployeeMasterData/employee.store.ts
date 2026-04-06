import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import {
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import {
    Events,
    on,
    withEventHandlers,
    withReducer,
} from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { Employee, PageResponse } from './employee.model';
import { employeeEvents } from './employee.event';
import { EmployeeService } from './employee.service';

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: unknown;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

export const EmployeeStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withComputed((state) => ({})),

    withMethods((store) => ({})),

    withReducer(
        on(employeeEvents.loadEmployees, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(employeeEvents.loadEmployeesSuccess, ({ payload }, state) => ({
            ...state,
            employees: payload.content, // ✅ tab use hoga
            loading: false,
        })),
        on(employeeEvents.loadEmployeesFailed, ({ payload }, state) => ({
            ...state,
            error: payload.error,
            loading: false,
        })),

        // create Employee
        on(employeeEvents.createEmployee, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(employeeEvents.createEmployeeSuccess, ({ payload }, state) => ({
            ...state,
            loading: false,
            employees: [...state.employees, payload],
        })),
        on(employeeEvents.createEmployeeFailed, ({ payload }, state) => ({
            ...state,
            error: payload.error,
            loading: false,
        })),

        // update Employee
        on(employeeEvents.updateEmployee, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(employeeEvents.updateEmployeeSuccess, ({ payload }, state) => ({
            ...state,
            loading: false,
            employees: state.employees.map(e =>
                e.id === payload.id ? { ...e, ...payload } : e),
        })),
        on(employeeEvents.updateEmployeeFailed, ({ payload }, state) => ({
            ...state,
            error: payload.error,
            loading: false,
        })),
    ),

    withEventHandlers(
        (store, employeeService: EmployeeService = inject(EmployeeService), events = inject(Events)) => ({
            loadEmployees$: events.on(employeeEvents.loadEmployees).pipe(
                switchMap(() =>
                    employeeService.getAllEmployees().pipe(
                        mapResponse({
                            next: (response: PageResponse<Employee>) => employeeEvents.loadEmployeesSuccess(response),
                            error: (error) => employeeEvents.loadEmployeesFailed({ error }),
                        }),
                    ),
                ),
            ),

            // create Employee
            createEmployee$: events.on(employeeEvents.createEmployee).pipe(
                switchMap(({ payload }) => {
                    console.log('Effect triggered payload:', payload);
                    return employeeService.createEmployee(payload).pipe(
                        mapResponse({
                            next: (response) => {
                                console.log('API response:', response);
                                return employeeEvents.createEmployeeSuccess(response);
                            },
                            error: (error) => {
                                console.error('API error:', error);
                                return employeeEvents.createEmployeeFailed({ error });
                            },
                        }),
                    );
                }),
            ),

            // update Employee
            updateEmployee$: events.on(employeeEvents.updateEmployee).pipe(
                switchMap(({ payload }) =>
                    employeeService.updateEmployee(payload.id, payload.request).pipe(
                        mapResponse({
                            next: (response: Employee) => employeeEvents.updateEmployeeSuccess(response),
                            error: (error) => employeeEvents.updateEmployeeFailed({ error }),
                        }),
                    ),
                ),
            ),
        }),
    ),
);
