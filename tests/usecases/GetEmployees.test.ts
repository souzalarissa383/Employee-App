import { GetEmployees } from './../../src/usecases/GetEmployees';
import { EmployeeRepository } from './../../src/data/repositories/EmployeeRepository';

jest.mock('./../../src/data/repositories/EmployeeRepository');

describe('GetEmployees', () => {
  it('deve retornar uma lista de funcionários', async () => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Giovana L. Arruda',
        job: 'Developer',
        admission_date: '2021-01-01',
        phone: '1234567890',
        image: 'https://example.com/image1.png',
      },
    ];

    const mockRepository = {
      getEmployees: jest.fn().mockResolvedValue(mockEmployees),
    } as unknown as EmployeeRepository;

    const getEmployees = new GetEmployees(mockRepository);
    const result = await getEmployees.execute();

    expect(result).toEqual(mockEmployees);
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
  });
});
