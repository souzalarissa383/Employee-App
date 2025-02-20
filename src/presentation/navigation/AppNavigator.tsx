import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../../app/index';
import EmployeeListScreen from '../screens/EmployeeListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View testID="navigation-container" style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;