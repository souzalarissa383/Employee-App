import { EmployeeDataSourceImpl } from '../../../src/data/datasources/EmployeeDataSource';
import { Employee } from '../../../src/domain/models/Employee';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: 'John Doe', position: 'Developer' },
      ]),
  })
) as jest.Mock;

describe('EmployeeDataSourceImpl', () => {
  it('deve buscar a lista de funcionários', async () => {
    const dataSource = new EmployeeDataSourceImpl();
    const employees: Employee[] = await dataSource.getEmployees();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/employees');
    expect(employees).toEqual([{ id: 1, name: 'John Doe', position: 'Developer' }]);
  });
});
