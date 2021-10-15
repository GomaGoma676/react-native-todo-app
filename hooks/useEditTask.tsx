import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDoc, doc } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { db } from '../firebaseConfig';
import { selectUser } from '../slices/userSlice';
import {
  selectEditedTask,
  resetEditedTask,
  setEditedTask,
  selectTag,
} from '../slices/todoSlice';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditTask'>;
};

export const useEditTask = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const tag = useSelector(selectTag);
  const editedTask = useSelector(selectEditedTask);
  const [updateErr, setUpdateErr] = useState('');

  const resetInput = () => {
    dispatch(resetEditedTask());
  };
  const onChangeTask = (txt: string) =>
    dispatch(setEditedTask({ ...editedTask, title: txt }));

  const updateTask = async () => {
    setUpdateErr('');
    if (editedTask?.title !== '' && editedTask?.id !== '') {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'tags', tag.id, 'tasks', editedTask.id),
          {
            title: editedTask.title,
          },
          { merge: true },
        );
        dispatch(resetEditedTask());
        navigation.goBack();
      } catch (err: any) {
        dispatch(resetEditedTask());
        setUpdateErr(err.message);
      }
    }
  };
  return {
    onChangeTask,
    editedTask,
    updateErr,
    updateTask,
    resetInput,
  };
};
