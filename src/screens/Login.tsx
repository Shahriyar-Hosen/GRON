import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColor} from '../theme';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: appColor.bg2}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2.5">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center w-full min-h-[200px]">
          <Image
            className="w-[270px] h-[80px]"
            source={require('../assets/logo/logo.png')}
          />
          <View />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8 rounded-t-[50px]">
        <View className="form space-y-2">
          <Text className="text-gray-700 rounded-2xl mb-3">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="john@gmail.com"
            placeholder="Email Address"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            value="test123456"
            placeholder="Email Address"
          />
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-orange-400 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="py-2 bg-orange-100 rounded-xl w-full">
            <Text className="text-sm font-bold text-center text-gray-700">
              Social Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
