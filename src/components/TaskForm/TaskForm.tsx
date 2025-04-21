import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import style from './TaskForm.module.scss';
import { Priority, TaskFormValues, Status } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoards, fetchUsers } from '../../redux/thunks';
import { Loader } from '../Loader/Loader';

type TaskFormProps = {
  onSubmit: (data: TaskFormValues) => void;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
  values?: TaskFormValues;
};

function TaskForm({ onSubmit, onCancel, values }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: values,
  });

  const {
    boards,
    isLoading: isBoardsLoading,
    error: boardsError,
  } = useAppSelector((state) => state.boards);

  const {
    users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const fromBoardPage = matchPath('/boards/:id', location.pathname);
  const boardId = fromBoardPage ? fromBoardPage?.params.id : values?.boardId;

  const fromTasksPage = matchPath('/tasks', location.pathname);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${values?.boardId}`);
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBoards());
  }, []);

  if (isBoardsLoading || isUsersLoading) return <Loader /> ;
  if (boardsError || usersError) {
    return <p>An error has occurred</p>;
  }

  return (
    <>
      <h2 className={style.formTitle}>{values ? 'Редактирование' : 'Создание'} задачи</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.formLabel}>
          <p>
            Название
            {errors?.title && <span className={style.formError}>* Заполните название задачи</span>}
          </p>
          <input
            type="text"
            className={`input ${style.formInput}`}
            {...register('title', { required: true })}
            placeholder="Введите название задачи"
          />
        </label>
        <label className={style.formLabel}>
          <p>Описание</p>
          {errors?.description && (
            <span className={style.formError}>* Заполните описание задачи</span>
          )}
          <textarea
            className={`input ${style.formInput}`}
            {...register('description', { required: true })}
            placeholder="Введите описание задачи"
          />
        </label>
        <label className={style.formLabel}>
          <p>Проект</p>
          <select
            {...register('boardId')}
            defaultValue={boardId}
            className={`input ${style.formInput}`}
          >
            {boards.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className={style.formLabel}>
          <p>Приоритет</p>
          <select
            {...register('priority')}
            defaultValue={values?.priority}
            className={`input ${style.formInput}`}
          >
            {Object.values(Priority).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={style.formLabel}>
          <p>Статус</p>
          <select
            {...register('status')}
            defaultValue={values?.status}
            className={`input ${style.formInput}`}
          >
            {Object.values(Status).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={style.formLabel}>
          <p>Исполнитель</p>
          <select
            {...register('assigneeId')}
            defaultValue={values?.assigneeId}
            className={`input ${style.formInput}`}
          >
            {users.map((item) => (
              <option key={item.id} value={item.id}>
                {item.fullName}
              </option>
            ))}
          </select>
        </label>
        <div className={style.formBtns}>
          {fromTasksPage && values && (
            <button type="button" className="button" onClick={handleClick}>
              Перейти к доске
            </button>
          )}
          <div className={style.formBtns}>
            <button type="submit" className="button">
              {values ? 'Обновить' : 'Создать'}
            </button>
            <button type="button" className="button" onClick={onCancel}>
              Отмена
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
