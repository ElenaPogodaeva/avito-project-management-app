import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import TaskList from '../../components/TaskList/TaskList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTask, fetchTasks } from '../../redux/thunks';
import style from './TasksPage.module.scss';
import { TaskCreate, TaskFormValues } from '../../types';
import Modal from '../../components/Modal/Modal';
import TaskForm from '../../components/TaskForm/TaskForm';
import Search from '../../components/Search/Search';
import { Loader } from '../../components/Loader/Loader';

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

    await dispatch(addTask(newValues));
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div className="message">Error occured</div>;

  return (
    <div className="page">
      <Search />
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
