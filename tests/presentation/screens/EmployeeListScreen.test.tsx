import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import EmployeeListScreen from '../../../src/presentation/screens/EmployeeListScreen';
import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
  useFonts: jest.fn(() => [true, null]),
}));

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: jest.fn(() => null),
}));

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

jest.mock('../../../src/data/datasources/EmployeeDataSource', () => ({
  EmployeeDataSourceImpl: jest.fn().mockImplementation(() => ({
    getEmployees: jest.fn().mockResolvedValue(mockEmployees),
  })),
}));

jest.mock('../../../src/data/repositories/EmployeeRepository', () => ({
  EmployeeRepository: jest.fn().mockImplementation(() => ({
    getEmployees: jest.fn().mockResolvedValue(mockEmployees),
  })),
}));

describe('EmployeeListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('carrega e exibe a lista de funcionários corretamente', async () => {
    render(<EmployeeListScreen />);

    await waitFor(() => {
      expect(screen.getByText('Giovana L. Arruda')).toBeTruthy();
    });

    const employeeItem = screen.getByText('Giovana L. Arruda');
    fireEvent.press(employeeItem);

    await waitFor(() => {
      expect(screen.getByText('Developer')).toBeTruthy();
      expect(screen.getByText('01/01/2021')).toBeTruthy();
      expect(screen.getByText('(12) 3456-7890')).toBeTruthy();
    });
  });
});