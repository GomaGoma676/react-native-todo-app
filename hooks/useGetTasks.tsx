import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../firebaseConfig';
import { selectUser } from '../slices/userSlice';
import { resetEditedTask, selectTag } from '../slices/todoSlice';
import { Task } from '../types/types';

export const useGetTasks = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const tag = useSelector(selectTag);
  const [tasks, setTasks] = useState<Task[]>();
  const [getErr, setGetErr] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'users', user.uid, 'tags', tag.id, 'tasks'),
      orderBy('createdAt', 'desc'),
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setTasks(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                title: doc.data().title,
                completed: doc.data().completed,
                createdAt: format(
                  doc.data({ serverTimestamps: 'estimate' }).createdAt.toDate(),
                  'yyyy-MM-dd HH:mm',
                ),
              } as Task),
          ),
        );
      },
      (err: any) => {
        setGetErr(err.message);
      },
    );
    return () => {
      unsub();
      dispatch(resetEditedTask());
    };
  }, []);
  return {
    tasks,
    getErr,
  };
};
