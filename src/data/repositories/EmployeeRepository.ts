import { Employee } from '../../domain/models/Employee';
import { EmployeeDataSource } from '../datasources/EmployeeDataSource';

export class EmployeeRepository {
  constructor(private dataSource: EmployeeDataSource) {}

  async getEmployees(): Promise<Employee[]> {
    return this.dataSource.getEmployees();
  }
}