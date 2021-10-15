import React, { VFC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { AuthScreen } from '../screens/AuthScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackNavigator: VFC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Auth" component={AuthScreen} />
  </Stack.Navigator>
);
