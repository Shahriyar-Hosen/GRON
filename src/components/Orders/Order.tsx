import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ItemData} from '.';

export const OrderItem: FC<ItemData> = ({title, image, location, duration}) => {
  const handlePress = () => {
    console.log('pressed');
  };

  return (
    <View className="p-1.5 pr-2 mx-4 my-2 rounded-xl border border-primary/50 flex flex-row justify-between">
      <View className="flex flex-row gap-2.5">
        <View className="w-fit border-2 rounded-md border-accent overflow-hidden">
          <Image
            className="w-[60px] h-[60px]"
            source={{
              uri: image,
            }}
          />
        </View>
        <View className="space-y-2.5">
          <Text className="text-base font-bold text-gray-700">{title}</Text>
          <Text className="text-gray-700 text-xs">{location}</Text>
        </View>
      </View>

      <View className="flex-col justify-between">
        <Text className="text-gray-700 text-xs">{duration}</Text>
        <TouchableOpacity
          onPress={handlePress}
          className="bg-primary p-0.5 px-2.5 rounded-md">
          <Text className="text-white">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
