import React from 'react';
import { LogBox } from 'react-native';
import { RootNavigator } from './navigations/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release',
]);

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
