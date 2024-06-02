import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {VirtualizedList} from 'react-native';
import {useUser} from '../../hooks';
import {API} from '../../utils/constend';
import {OrderItem} from './card';

export type ItemData = {
  id: number;
  product: {
    id: number;
    name: string;
  };
  vendor: {
    id: number;
    name: string;
    location: string;
  };
  location: string;
  duration: string;
};

const getItem = (data: any[], index: number) => data[index];
const getItemCount = (data: any[]) => data.length;

export const Orders = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {user, isLoading} = useUser();

  const dt = {
    user_id: user?.user_id,
    get_for: 'delivery_boy',
    status: 'accepted',
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
  useEffect(() => {
    if (user && !isLoading) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  const handleRefresh = () => {
    setRefresh(true);
    getData();
    setRefresh(false);
  };
  const renderItem = ({item}: any) => {
    return <OrderItem {...item} refresh={handleRefresh} />;
  };

  if (!loading && data) {
    return (
      <VirtualizedList
        data={data}
        renderItem={renderItem}
        initialNumToRender={4}
        keyExtractor={item => String(item.request_id)}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshing={refresh}
        onRefresh={handleRefresh}
      />
    );
  }
};
