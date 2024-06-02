import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logout} from '../helpers';
import {appColor} from '../theme';
import storage from '../utils/storage';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>('delivery_boy_3');
  const [password, setPassword] = useState('3m&cbOIkFZLiR@gY67TM&)2J');

  const handleSubmit = () => {
    const data = {username, password};
    axios
      .post('https://www.gron.com.my/wp-json/gron/v1/login', data)
      .then(response => {
        storage
          .save({
            key: 'user',
            data: response.data,
            expires: null,
          })
          .then(() => navigation.navigate('Orders'));
      })
      .catch(error => {
        console.error('Error sending data: ', error);
      });
  };

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: appColor.bg}}>
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
          <Text className="text-gray-700 rounded-2xl mb-3">User Name</Text>

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={username}
            placeholder="username"
            onChangeText={setUsername}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            value={password}
            placeholder="your password"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={logout} className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-orange-400 rounded-xl">
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-700/80 font-bold text-center py-5">
          Or
        </Text>
        <TouchableOpacity
          disabled
          className="py-2 bg-orange-100 rounded-xl w-full">
          <Text className="text-sm font-bold text-center text-gray-700/80 disabled:opacity-50">
            Social Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
