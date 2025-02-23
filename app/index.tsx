import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('EmployeeList');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={[styles.logo, { width: width * 0.6 }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0500FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    aspectRatio: 5,
  },
});

export default SplashScreen;