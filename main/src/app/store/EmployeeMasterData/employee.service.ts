import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee, EmployeeCreateRequest, PageResponse } from './employee.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private http = inject(HttpClient);
  private api = environment.apiBaseUrl + '/employees';

  // ✅ Get All Employees (with pagination)
  getAllEmployees(page: number = 0, size: number = 5): Observable<PageResponse<Employee>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<Employee>>(this.api, { params });
  }

  // ✅ Get by Department
  getByDepartment(dept: string, page: number = 0, size: number = 5): Observable<PageResponse<Employee>> {
    return this.http.get<PageResponse<Employee>>(
      `${this.api}/department/${dept}?page=${page}&size=${size}`
    );
  }

  // ✅ Create Employee
  createEmployee(request: EmployeeCreateRequest): Observable<Employee> {
    return this.http.post<Employee>(this.api, request);
  }

  // ✅ Update Employee
  updateEmployee(id: number, request: EmployeeCreateRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/${id}`, request);
  }

  // ✅ Delete Employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}