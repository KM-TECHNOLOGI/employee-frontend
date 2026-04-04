export interface Employee {
	id: number;
	name: string,
	department: string,
	email: string,
	salary: number
}

export interface EmployeeCreateRequest {
	name: string,
	department: string,
	email: string,
	salary: number
}

// Pagination response interface
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
}




