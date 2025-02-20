import { Employee } from '../../../src/domain/models/Employee';

describe('Employee', () => {
  it('should create an employee object', () => {
    const employee: Employee = { 
      id: 1,
      name: 'John Doe',
      job: 'Developer',
      admission_date: '2023-01-01',
      phone: '123-456-7890',
      image: 'image.png',
    };

    expect(employee.id).toBe(1);
    expect(employee.name).toBe('John Doe');
    expect(employee.job).toBe('Developer');
    expect(employee.admission_date).toBe('2023-01-01');
    expect(employee.phone).toBe('123-456-7890');
    expect(employee.image).toBe('image.png');
  });
});