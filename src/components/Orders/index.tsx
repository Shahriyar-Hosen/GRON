import React from 'react';
import {FlatList} from 'react-native';
import {OrderItem} from './Order';

export type ItemData = {
  id: string;
  title: string;
  image: string;
  location: string;
  duration: string;
};

const DATA: ItemData[] = [
  {
    id: '0',
    title: 'Potatoes',
    image: 'https://picsum.photos/200/300?random=1',
    location: 'Akdala, Tebariya, Natore',
    duration: '2hr 30min',
  },
  {
    id: '1',
    title: 'Pepper',
    image: 'https://picsum.photos/200/300?random=7',
    location: 'Locongor, Tebariya, Natore',
    duration: '2hr 45min',
  },
  {
    id: '2',
    title: 'Eggplant',
    image: 'https://picsum.photos/200/300?random=33',
    location: 'Asina Ambagan, Tebariya, Natore',
    duration: '2hr 15min',
  },
];

export const Orders = () => {
  const renderItem = ({item}: {item: ItemData}) => {
    return <OrderItem {...item} />;
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};
