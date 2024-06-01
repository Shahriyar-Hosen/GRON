import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import storage from '../utils/storage';

interface IUser {
  display_name: string;
  token: string;
  user_id: number;
}

export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const navigation = useNavigation();

  useEffect(() => {
    storage
      .load({
        key: 'user',
        autoSync: true,
        syncInBackground: true,
      })
      .then(res => setUser(res))
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            console.warn('User Not Found! Please login');
            navigation.navigate('Login');
            break;
          case 'ExpiredError':
            console.warn('Login date expired! Please login');
            navigation.navigate('Login');
            break;
        }
      });
  }, [navigation]);

  return user;
};
