export type User = {
  uid: string;
  email: string;
};

export type Tag = {
  id: string;
  name: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type RootStackParamList = {
  Auth: undefined;
  TagList: undefined;
  CreateTag: undefined;
  TaskList: undefined;
  TaskStack: undefined;
  CreateTask: undefined;
  EditTask: undefined;
};
