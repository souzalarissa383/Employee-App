import React from 'react';
import { render, act } from '@testing-library/react-native';
import AppNavigator from '@presentation/navigation/AppNavigator';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('AppNavigator', () => {
  it('deve renderizar corretamente a navegação', async () => {
    const { findByTestId } = render(<AppNavigator />);
    const navigationContainer = await findByTestId('navigation-container');
    expect(navigationContainer).toBeTruthy();
  });
});