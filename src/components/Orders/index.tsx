import React from 'react';
import {VirtualizedList} from 'react-native';
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
