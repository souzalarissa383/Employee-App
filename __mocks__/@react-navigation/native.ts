jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
      NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
    };
  });
  