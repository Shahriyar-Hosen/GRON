import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../hooks';
import {appColor} from '../theme';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'GRON App Location Permission',
          message: 'GRON App needs access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the User Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [currentLocation, setCurrentLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });

  const user = useUser();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        if (
          latitude !== currentLocation.latitude ||
          longitude !== currentLocation.longitude
        ) {
          setCurrentLocation({latitude, longitude});
        }
      },
      error =>
        Alert.alert('Something', 'Error:-' + error.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Try Again!', onPress: () => getCurrentLocation()},
        ]),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // const openMaps = () => {
  //   const {latitude, longitude} = currentLocation || {};
  //   if (latitude && longitude) {
  //     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  //     Linking.openURL(url);
  //   }
  // };

  useEffect(() => {
    permission();
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  // const intervalId = setInterval(getCurrentLocation, 30000); // 60000ms = 1 minute

  // return () => clearInterval(intervalId);

  // }, []);

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
          {/* <View className="space-y-2.5">
            <Text className="text-primary text-lg text-center font-bold">
              Latitude:{' '}
              {currentLocation.latitude
                ? currentLocation.latitude
                : 'Loading...'}
            </Text>
            <Text className="text-primary text-lg text-center font-bold">
              Longitude:{' '}
              {currentLocation.longitude
                ? currentLocation.longitude
                : 'Loading...'}
            </Text>
          </View> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(user?.token ? 'Orders' : 'Login')
            }
            className="py-3 bg-orange-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              {user?.token ? 'My Orders' : 'Login'}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={openMaps}
            className="py-3 bg-orange-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Open Map
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
