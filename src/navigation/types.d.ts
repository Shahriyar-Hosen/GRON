// import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import type {
//     CompositeScreenProps,
//   NavigatorScreenParams,
// } from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Welcome: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// export type HomeTabParamList = {
//   Popular: undefined;
//   Latest: undefined;
// };

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
