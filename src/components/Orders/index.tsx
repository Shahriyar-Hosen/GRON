import React from 'react';
import {VirtualizedList} from 'react-native';
import {useUser} from '../../hooks';
import {OrderItem} from './card';
import {DATA} from './demodata';

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

const getItem = (data: ItemData[], index: number) => data[index];
const getItemCount = (data: ItemData[]) => data.length;

export const Orders = () => {
  const renderItem = ({item}: {item: ItemData}) => {
    return <OrderItem {...item} />;
  };

  const {user, isLoading} = useUser();

  // useEffect(() => {
  //   const dt = {
  //     user_id: user?.user_id,
  //     get_for: 'delivery_boy',
  //     status: 'accepted',
  //   };
  //   const getData = async () => {
  //     axios
  //       .post('https://www.gron.com.my/wp-json/gron/v1/login', dt, {
  //         headers: {Authorization: `Bearer ${user?.token}`},
  //       })
  //       .then(response => {
  //         console.log('🚀 ~ Orders ~ response:', response);
  //       })
  //       .catch(error => {
  //         console.error('Error sending data: ', error);
  //       });
  //   };
  //   if (user && !isLoading) {
  //     getData();
  //   }
  // }, [isLoading, user]);

  return (
    <VirtualizedList
      data={DATA}
      renderItem={renderItem}
      initialNumToRender={4}
      keyExtractor={item => String(item.id)}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};
