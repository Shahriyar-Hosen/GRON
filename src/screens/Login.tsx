import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColor} from '../theme';
import {API} from '../utils/constend';
import storage from '../utils/storage';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const data = {username, password};
    axios
      .post(`${API}/login`, data)
      .then(response => {
        storage
          .save({
            key: 'user',
            data: response.data,
            expires: null,
          })
          .then(() => navigation.navigate('Orders'));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
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
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className="py-3 bg-orange-400 rounded-xl">
            <Text className="text-xl font-bold text-center text-white">
              {loading ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
