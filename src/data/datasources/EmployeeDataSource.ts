import { Employee } from '../../domain/models/Employee';

export interface EmployeeDataSource {
  getEmployees(): Promise<Employee[]>;
}

export class EmployeeDataSourceImpl implements EmployeeDataSource {
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch('http://localhost:3000/employees');
    return response.json();
  }
}