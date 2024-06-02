import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ILocation} from '../App';

export type RootStackParamList = {
  Welcome: ILocation;
  Login: undefined;
  Orders: undefined;
  Delivery: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
