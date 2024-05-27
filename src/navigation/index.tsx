import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import {HomeScreen, LoginScreen, OrdersScreen, WelcomeScreen} from '../screens';
import storage from '../utils/storage';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  useEffect(() => {
    storage
      .load({
        key: 'user',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        console.log(ret);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            console.warn('User Not Found! Please login');
            // TODO;
            break;
          case 'ExpiredError':
            console.warn('Login date expired! Please login');
            // TODO
            break;
        }
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
