import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../../hooks';
import {API} from '../../utils/constend';
import storage from '../../utils/storage';

const Item: FC<{label: string; value: string}> = ({label, value}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="font-bold text-xs">{label}: </Text>
      <Text className="text-xs">{value}</Text>
    </View>
  );
};

export const OrderItem = (props: any) => {
  const {isLoading, user} = useUser();
  const [collected, setCollected] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [reachedLoading, setReachedLoading] = useState(false);

  const saveArray = async (key: any, array: any) => {
    try {
      await storage.save({
        key: key,
        data: array,
      });
    } catch (e) {
      console.error('Error saving array: ', e);
    }
  };

  const getArray = async (key: any, defaultValue = []) => {
    try {
      const array = await storage.load({
        key: key,
      });
      return array;
    } catch (e: any) {
      if (e.name === 'NotFoundError') {
        return defaultValue;
      } else {
        console.error('Error fetching array: ', e);
        throw e;
      }
    }
  };

  const addItemToArray = async (key: any, item: any, defaultValue = []) => {
    try {
      const currentArray = await getArray(key, defaultValue);
      currentArray.push(item);
      await saveArray(key, currentArray);
      console.log('🚀 ~ addItemToArray ~ currentArray:', currentArray);
    } catch (e) {
      console.error('Error adding item to array: ', e);
    }
  };

  const removeArrayItems = async (key: any, item: any) => {
    const existingItems = await getArray('collected-items');
    const newArray = existingItems.filter(
      (arrayItem: any) => arrayItem !== item,
    );

    saveArray('collected-items', newArray);
  };

  useEffect(() => {
    getArray('collected-items').then(res => setCollected(res));
  }, []);

  const handleCollect = async () => {
    if (!isLoading && user) {
      const data = {
        order_id: props.order_id,
        vendor_id: props.vendor_id,
        user_id: user.user_id,
      };
      setCollectionLoading(true);
      axios
        .put(`${API}/order/collected`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(async () => {
          await addItemToArray('collected-items', props.request_id);
          props.refresh();
          setCollectionLoading(false);
        })
        .catch(error => {
          setCollectionLoading(false);
          console.error('Error sending data: ', error);
        });
    }
  };

  const handleReached = () => {
    setReachedLoading(true);
    if (!isLoading && user) {
      const data = {
        request_id: props.request_id,
        order_id: props.order_id,
        vendor_id: props.vendor_id,
        user_id: user.user_id,
      };
      axios
        .put(`${API}/order/reached`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setReachedLoading(false);
          removeArrayItems('collected-items', props.request_id);
          props.refresh();
        })
        .catch(error => {
          setReachedLoading(false);
          console.error('Error sending data: ', error);
        });
    }
  };

  return (
    <SafeAreaView className="p-1.5 pr-2 mx-4 my-2 rounded-xl border border-primary/50">
      <View>
        <Item label="Order ID" value={props.order_id || ''} />
        <Item label="Store Name" value={props.store_name || ''} />
      </View>
      <View className="flex flex-row justify-end items-center gap-1.5">
        {!collected.includes(props?.request_id) && (
          <TouchableOpacity
            onPress={handleCollect}
            disabled={collectionLoading || reachedLoading}
            className="bg-accent p-0.5 px-2.5 rounded-md">
            <Text className="text-white text-xs">
              {collectionLoading ? 'Processing...' : 'Collected'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleReached}
          disabled={collectionLoading || reachedLoading}
          className="bg-secondary p-0.5 px-2.5 rounded-md">
          <Text className="text-white text-xs">
            {reachedLoading ? 'Processing...' : 'Reached'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
