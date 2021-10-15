import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db } from '../firebaseConfig';
import { RootStackParamList } from '../types/types';
import { selectUser } from '../slices/userSlice';
import {
  selectEditedTask,
  resetEditedTask,
  setEditedTask,
  selectTag,
} from '../slices/todoSlice';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

export const useCreateTask = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const tag = useSelector(selectTag);
  const editedTask = useSelector(selectEditedTask);
  const [createErr, setCreateErr] = useState('');
  const resetInput = () => {
    dispatch(resetEditedTask());
  };
  const onChangeTask = (txt: string) =>
    dispatch(setEditedTask({ ...editedTask, title: txt }));

  const createTask = async () => {
    setCreateErr('');
    if (editedTask?.title !== '') {
      try {
        await addDoc(
          collection(db, 'users', user.uid, 'tags', tag.id, 'tasks'),
          {
            title: editedTask.title,
            completed: false,
            createdAt: serverTimestamp(),
          },
        );
        dispatch(resetEditedTask());
        navigation.goBack();
      } catch (err: any) {
        dispatch(resetEditedTask());
        setCreateErr(err.message);
      }
    }
  };
  return {
    onChangeTask,
    editedTask,
    createErr,
    createTask,
    resetInput,
  };
};
