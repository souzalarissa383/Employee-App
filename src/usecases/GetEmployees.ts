import { EmployeeRepository } from '../data/repositories/EmployeeRepository';
import { Employee } from '../domain/models/Employee';

export class GetEmployees {
  constructor(private repository: EmployeeRepository) {}

  async execute(): Promise<Employee[]> {
    return this.repository.getEmployees();
  }
}