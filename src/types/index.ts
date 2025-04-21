export type Board = {
  id: number;
  description: string;
  name: string;
  taskCount: number;
};

export type BoardsResponse = {
  data: Board[];
};

export type usersResponse = {
  data: Assignee[];
};

export type Task = {
  id: number;
  description: string;
  title: string;
  priority: (typeof Priority)[keyof typeof Priority];
  status: (typeof Status)[keyof typeof Status];
  boardId: number;
  assignee: Assignee;
};

export type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type TaskCreate = {
  description: string;
  title: string;
  priority: (typeof Priority)[keyof typeof Priority];
  boardId: number;
};

export type TaskUpdate = {
  description: string;
  title: string;
  status: (typeof Status)[keyof typeof Status];
  priority: (typeof Priority)[keyof typeof Priority];
  assigneeId: number;
};

export type UpdateStatus = {
  status: (typeof Status)[keyof typeof Status];
};

export const Priority = {
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
} as const;

export const Status = {
  Backlog: 'Backlog',
  InProgress: 'InProgress',
  Done: 'Done',
} as const;

export type Config = {
  method: string;
  headers: {
    'Content-Type'?: string;
  };
  body?: string;
};

export type TaskFormValues = Partial<Task>;
