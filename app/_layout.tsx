import { Stack } from 'expo-router';
import React from 'react';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './index'; 
import EmployeeListScreen from './EmployeeList';

const StackNavigator = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <StackNavigator.Navigator initialRouteName="index">
      <StackNavigator.Screen
        name="index" 
        component={SplashScreen}
        options={{ headerShown: false }} 
      />
      <StackNavigator.Screen
        name="EmployeeList" 
        component={EmployeeListScreen}
        options={{ headerShown: false }} 
      />
    </StackNavigator.Navigator>
  );
}