import axios from 'axios';
import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../../hooks';
import {API} from '../../utils/constend';

const Item: FC<{label: string; value: string}> = ({label, value}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="text-black font-bold text-xs">{label}: </Text>
      <Text className="text-black text-xs">{value}</Text>
    </View>
  );
};

export const DeliveryItem: FC<any> = props => {
  const {isLoading, user} = useUser();
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    if (!isLoading && user) {
      const data = {
        request_id: props.request_id,
        user_id: user.user_id,
        order_id: props.order_id,
      };
      setLoading(true);
      axios
        .put(`${API}/order/delivery-requests`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setLoading(false);
          props.refresh();
        })
        .catch(error => {
          setLoading(false);
          console.error('Error sending data: ', error);
        });
    }
  };

  return (
    <SafeAreaView className="p-1.5 pr-2 mx-4 my-2 rounded-xl border border-primary/50">
      <View className="pl-0.5 pt-0.5">
        <View>
          <Item label="Order ID" value={props.order_id || ''} />
          <Item label="Store Name" value={props.store_name || ''} />
        </View>
      </View>
      <View className="flex flex-row justify-end items-center gap-1.5 mt-2.5 border-t ml-1 border-slate-600/20">
        <TouchableOpacity
          onPress={handleAccept}
          disabled={loading}
          className="bg-secondary p-0.5 px-2.5 rounded-md">
          <Text className="text-white text-xs">
            {loading ? 'Accepting...' : 'Accept'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
