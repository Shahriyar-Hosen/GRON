import {useNavigation} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useState} from 'react';
import {Button} from 'react-native';
import storage from '../../utils/storage';

export const LogoutButton = (props: HeaderButtonProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  const logout = () => {
    setLoading(true);
    storage
      .remove({key: 'user'})
      .then(() => {
        setLoading(false);
        navigate.navigate('Login');
      })
      .catch(() => setLoading(false));
  };
  return (
    <Button
      title={loading ? 'loading...' : 'logout'}
      disabled={loading}
      color="orange"
      onPress={logout}
      {...props}
    />
  );
};
