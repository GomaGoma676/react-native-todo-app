import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import { View, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { RootStackParamList } from '../types/types';
import { selectUser, logout } from '../slices/userSlice';
import { TagListScreen } from '../screens/TagListScreen';
import { CreateTagScreen } from '../screens/CreateTagScreen';
import { IconButton } from '../components/IconButton';
import { TaskStackNavigator } from './TaskStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const TagStackNavigator: VFC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch {
      Alert.alert('Logout error');
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008b8b',
          },
          headerTitle: user.email,
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerRight: () => (
            <View style={tw('mr-3')}>
              <IconButton
                name="logout"
                size={20}
                color="white"
                onPress={signOut}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="TagList" component={TagListScreen} />
        <Stack.Screen name="TaskStack" component={TaskStackNavigator} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="CreateTag" component={CreateTagScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
