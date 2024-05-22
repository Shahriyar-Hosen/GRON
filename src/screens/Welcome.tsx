import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColor} from '../theme';

export const WelcomeScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: appColor.bg2, flex: 1}}>
      <View>
        <Text>WelcomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};
