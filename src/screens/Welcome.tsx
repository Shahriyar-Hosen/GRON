import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColor} from '../theme';

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: appColor.bg2}} className="flex-1">
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white text-4xl font-bold text-center">
          Let's get started!
        </Text>
        <View className="flex-row justify-center">
          <View className="w-[350px] h-[350px]" />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="py-3 bg-yellow-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
