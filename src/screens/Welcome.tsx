import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../hooks';
import {appColor} from '../theme';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {user} = useUser();

  return (
    <SafeAreaView style={{backgroundColor: appColor.bg}} className="flex-1">
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white text-4xl font-bold text-center">
          Let's get started!
        </Text>
        <View className="flex-row justify-center">
          <Image
            className="w-60 h-36"
            source={require('../assets/images/welcome.png')}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(user?.token ? 'Orders' : 'Login')
            }
            className="py-3 bg-orange-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-white">
              {user?.token ? 'My Orders' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
