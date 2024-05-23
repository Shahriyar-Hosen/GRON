import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColor} from '../theme';

export const WelcomeScreen = () => {
  return (
    <SafeAreaView
      style={{backgroundColor: appColor.bg2}}
      className="flex-1 justify-center items-center">
      <View>
        <Text className="text-white text-xl">Welcome Screen</Text>
      </View>
    </SafeAreaView>
  );
};
