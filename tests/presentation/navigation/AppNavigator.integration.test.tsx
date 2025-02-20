import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../../src/presentation/navigation/AppNavigator';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('Testes de navegação no AppNavigator', () => {
  it('deve navegar da SplashScreen para a EmployeeListScreen', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByTestId('employee-list-screen')).toBeTruthy();
    }, { timeout: 10000 }); 
  });
});