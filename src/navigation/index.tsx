import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LogoutButton} from '../components/common/LogoutButton';
import {
  DeliveryScreen,
  LoginScreen,
  OrdersScreen,
  WelcomeScreen,
} from '../screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="Orders"
          component={OrdersScreen}
          // eslint-disable-next-line react/no-unstable-nested-components
          options={{headerRight: props => <LogoutButton {...props} />}}
        />
        <Stack.Screen
          name="Delivery"
          component={DeliveryScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: props => <LogoutButton {...props} />,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
