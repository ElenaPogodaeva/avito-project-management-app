import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { getTasks } from '../../api/api';
import TaskList from '../../components/TaskList/TaskList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTask, fetchTasks } from '../../redux/thunks';
import style from './TasksPage.module.scss';
import { TaskCreate, TaskFormValues } from '../../types';
import Modal from '../../components/Modal/Modal';
import TaskForm from '../../components/TaskForm/TaskForm';

function TasksPage() {
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setIsEdit(false);
  };

  const handleSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    const newValues = {
      assigneeId: Number(data.assigneeId),
      description: data.description,
      priority: data.priority,
      boardId: Number(data.boardId),
      title: data.title,
    } as TaskCreate;

    console.log(data);
    await dispatch(addTask(newValues));
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="page">
      <TaskList tasks={tasks} />
      <button type="button" className={`button ${style.itemBtn}`} onClick={() => setIsEdit(true)}>
        Создать задачу
      </button>
      {isEdit && (
        <Modal>
          <TaskForm onSubmit={handleSubmit} onCancel={handleClick} />
        </Modal>
      )}
    </div>
  );
}

export default TasksPage;
