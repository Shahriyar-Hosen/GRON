import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Button} from 'react-native';
import {logout} from '../helpers';
import {HomeScreen, LoginScreen, OrdersScreen, WelcomeScreen} from '../screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LogoutButton = (props: HeaderButtonProps) => (
  <Button title="logout" color="orange" onPress={logout} {...props} />
);

const AppNavigation = () => {
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
          // eslint-disable-next-line react/no-unstable-nested-components
          options={{headerRight: props => <LogoutButton {...props} />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
