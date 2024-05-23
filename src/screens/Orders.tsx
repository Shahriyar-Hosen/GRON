import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Orders} from '../components/Orders';

export const OrdersScreen = () => {
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
