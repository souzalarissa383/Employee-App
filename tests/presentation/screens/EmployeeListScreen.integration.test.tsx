import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import EmployeeListScreen from '../../../src/presentation/screens/EmployeeListScreen';

jest.mock('../../../src/data/datasources/EmployeeDataSource', () => ({
  EmployeeDataSourceImpl: jest.fn().mockImplementation(() => ({
    getEmployees: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Giovana L. Arruda',
        job: 'Developer',
        admission_date: '2021-01-01',
        phone: '1234567890',
        image: 'https://example.com/image1.png',
      },
    ]),
  })),
}));

jest.mock('../../../src/data/repositories/EmployeeRepository', () => ({
  EmployeeRepository: jest.fn().mockImplementation(() => ({
    getEmployees: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Giovana L. Arruda',
        job: 'Developer',
        admission_date: '2021-01-01',
        phone: '1234567890',
        image: 'https://example.com/image1.png',
      },
    ]),
  })),
}));

describe('EmployeeListScreen - Integration Test', () => {
  it('deve carregar e exibir a lista de funcionários', async () => {
    render(<EmployeeListScreen />);

    await waitFor(() => {
      expect(screen.getByText('Giovana L. Arruda')).toBeTruthy();
    });
  });
});