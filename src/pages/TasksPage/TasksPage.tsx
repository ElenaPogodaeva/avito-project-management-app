import { useEffect, useState } from 'react';
import { getTasks } from '../../api/api';
import TaskList from '../../components/TaskList/TaskList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchTasks } from '../../redux/thunks';

function TasksPage() {
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="page">
      <TaskList tasks={tasks} />
    </div>
  );
}

export default TasksPage;
