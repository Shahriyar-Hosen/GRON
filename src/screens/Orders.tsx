import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Orders} from '../components/Orders';
import {useUser} from '../hooks';

export const OrdersScreen = () => {
  const user = useUser();
  const {navigate} = useNavigation();

  useEffect(() => {
    if (!user?.token) {
      navigate('Login');
    }
  }, [user, navigate]);

  return (
    <SafeAreaView className="flex-1 px-5">
      <View className="my-8">
        <Text className="text-primary/90 text-2xl font-bold">
          List of Orders
        </Text>
      </View>
      <Orders />
    </SafeAreaView>
  );
};
