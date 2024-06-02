import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemData} from '.';

const Item: FC<{label: string; value: string}> = ({label, value}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="font-bold text-xs">{label}: </Text>
      <Text className="text-xs">{value}</Text>
    </View>
  );
};

export const OrderItem: FC<ItemData> = props => {
  const {product, vendor, location, duration} = props;

  const handleCollect = () => {
    console.log('pressed');
  };
  const handleReached = () => {
    console.log('pressed');
  };

  return (
    <SafeAreaView className="p-1.5 pr-2 mx-4 my-2 rounded-xl border border-primary/50">
      <View className="pl-0.5 pt-0.5">
        <View>
          <Item label="Product" value={product.name} />
          <Item label="Vendor" value={vendor.name} />
          <Item label="Vendor Location" value={vendor.location} />
        </View>
        <View className="flex flex-row justify-between items-center my-2.5 border-t border-secondary/50 py-0.5">
          <Text className="text-xs">{location}</Text>
          <Text className="text-xs">{duration}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-end items-center gap-1.5">
        <TouchableOpacity
          onPress={handleCollect}
          className="bg-accent p-0.5 px-2.5 rounded-md">
          <Text className="text-white text-xs">Collected</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReached}
          className="bg-secondary p-0.5 px-2.5 rounded-md">
          <Text className="text-white text-xs">Reached</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
