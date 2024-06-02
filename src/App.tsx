import {PUSHER_CLUSTER, PUSHER_KEY} from '@env';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import AppNavigation from './navigation';

function App() {
  useEffect(() => {
    const pusherFn = async () => {
      const pusher = Pusher.getInstance();

      await pusher.init({
        apiKey: PUSHER_KEY,
        cluster: PUSHER_CLUSTER,
      });

      await pusher.connect();

      await pusher.subscribe({
        channelName: 'delivery-boy',
        onEvent: (event: PusherEvent) => {
          if (event.eventName === 'new-order') {
            PushNotification.localNotification({
              channelId: 'delivery-boy',
              title: 'New Order',
              message: 'There is a new order.',
            });
          }
        },
      });
    };
    pusherFn();
  }, []);

  return <AppNavigation />;
}

export default App;
