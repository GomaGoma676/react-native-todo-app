import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../types/types';
import { Title } from '../components/Title';
import { TaskItem } from '../components/TaskItem';
import { useToggleDeleteTask } from '../hooks/useToggleDeleteTask';
import { useGetTasks } from '../hooks/useGetTasks';

type Item = {
  item: Task;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TaskList'>;
};

export const TaskListScreen: VFC<Props> = ({ navigation }) => {
  const { tag, deleteTask, toggleCompleted } = useToggleDeleteTask();
  const { tasks, getErr } = useGetTasks();
  const tasksKeyExtractor = (item: Task) => item.id;
  const tasksRenderItem = ({ item }: Item) => (
    <TaskItem
      id={item.id}
      title={item.title}
      createdAt={item.createdAt}
      completed={item.completed}
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
    />
  );

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Title first="Tasks" last={tag.name} />
      <View style={tw('items-center')}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTask')}>
          <MaterialIcons name="playlist-add" size={40} color="#5f9ea0" />
        </TouchableOpacity>
        <Text style={tw('text-gray-700 mt-2 mb-5')}>Add task</Text>
        {getErr !== '' && (
          <Text style={tw('text-red-500 my-5 font-semibold')}>{getErr}</Text>
        )}
      </View>
      <View style={[tw('flex-1 m-2')]}>
        <FlatList
          data={tasks}
          keyExtractor={tasksKeyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={tasksRenderItem}
        />
      </View>
    </SafeAreaView>
  );
};
