import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, VirtualizedList} from 'react-native';
import {useUser} from '../../hooks';
import {API} from '../../utils/constend';
import {DeliveryItem} from './card';

const getItem = (data: any[], index: number) => data[index];
const getItemCount = (data: any[]) => data?.length;

export const Delivery = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {user, isLoading} = useUser();

  const dt = {
    user_id: user?.user_id,
    get_for: 'delivery_boy',
    status: 'pending',
  };

  const getData = async () => {
    axios
      .get(`${API}/order/delivery-requests`, {
        params: dt,
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error sending data: ', error);
      });
  };

  const handleRefresh = () => {
    setRefresh(true);
    getData();
    setRefresh(false);
  };

  const renderItem = ({item}: any) => {
    return <DeliveryItem {...item} refresh={handleRefresh} />;
  };

  useEffect(() => {
    setLoading(true);
    if (user && !isLoading) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  if (loading) {
    return <Text className="text-black">Loading...</Text>;
  }

  if (!loading && data) {
    return (
      <VirtualizedList
        data={data}
        renderItem={renderItem}
        initialNumToRender={4}
        keyExtractor={item => String(item.id)}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshing={refresh}
        onRefresh={handleRefresh}
      />
    );
  }
};
