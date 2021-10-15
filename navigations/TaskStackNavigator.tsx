import React, { VFC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { TaskListScreen } from '../screens/TaskListScreen';
import { CreateTaskScreen } from '../screens/CreateTaskScreen';
import { EditTaskScreen } from '../screens/EditTaskScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const TaskStackNavigator: VFC = () => {
  return (
    <Stack.Navigator initialRouteName="TaskList">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
