import '@testing-library/jest-native/extend-expect';
import { expect } from 'expect';

import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(() => null),
  FontAwesome: jest.fn(() => null),
}));
