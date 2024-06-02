import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
    <SafeAreaView className="flex-1 w-[95%] mx-auto">
      <View className="my-5">
        <Text className="text-primary/90 text-xl font-bold text-center">
          List of Orders
        </Text>
      </View>
      <View className="flex flex-row justify-end items-center">
        <TouchableOpacity
          onPress={() => navigate('Home')}
          className="p-0.5 px-2.5 rounded-md bg-accent/20 w-fit">
          <Text className="text-right text-green-500">Completed Order</Text>
        </TouchableOpacity>
      </View>
      <Orders />
    </SafeAreaView>
  );
};
