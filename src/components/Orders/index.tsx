import React from 'react';
import {VirtualizedList} from 'react-native';
import {OrderItem} from './Order';
import {DATA} from './demodata';

export type ItemData = {
  id: string;
  product: {
    id: string;
    name: string;
  };
  vendor: {
    id: string;
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

  return (
    <VirtualizedList
      data={DATA}
      renderItem={renderItem}
      initialNumToRender={4}
      keyExtractor={item => item.id}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};
