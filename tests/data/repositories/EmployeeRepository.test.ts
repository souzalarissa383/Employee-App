import { EmployeeRepository } from '../../../src/data/repositories/EmployeeRepository';
import { EmployeeDataSource } from '../../../src/data/datasources/EmployeeDataSource';

describe('EmployeeRepository', () => {
  it('deve retornar a lista de funcionários', async () => {
    const mockDataSource: EmployeeDataSource = {
      getEmployees: jest.fn().mockResolvedValue([
        { id: 1, name: 'John Doe', position: 'Developer' },
      ]),
    };

    const repository = new EmployeeRepository(mockDataSource);
    const employees = await repository.getEmployees();

    expect(mockDataSource.getEmployees).toHaveBeenCalled();
    expect(employees).toEqual([{ id: 1, name: 'John Doe', position: 'Developer' }]);
  });
});
