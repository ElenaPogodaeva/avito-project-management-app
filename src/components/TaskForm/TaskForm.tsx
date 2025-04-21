import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import style from './RepositoryForm.module.scss';
import { Priority, TaskFormValues, Status, Task } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetBoardsQuery } from '../../api/boards';
import { useGetUsersQuery } from '../../api/users';
import { fetchBoards, fetchUsers } from '../../redux/thunks';

type TaskFormProps = {
  onSubmit: (data: TaskFormValues) => void;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
  values: TaskFormValues;
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
  const boardId = fromBoardPage ? fromBoardPage?.params.id : values.boardId;

  console.log(values.assignee?.id);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBoards());
  }, []);

  // const { data: boardsData, isLoading: isBoardsLoading, error: boardsError } = useGetBoardsQuery();

  // const boards = boardsData?.data ?? [];

  // const { data: usersData, isLoading: isUsersLoading, error: usersError } = useGetUsersQuery();

  // const users = usersData?.data ?? [];

  const columns = [
    { title: 'К выполнению', status: Status.Backlog },
    { title: 'В работе', status: Status.InProgress },
    { title: 'Выполнено', status: Status.Done },
  ];

  console.log(values);
  if (isBoardsLoading || isUsersLoading) return <div className="">Loading</div>;
  if (boardsError || usersError) {
    return <p>An error has occurred</p>;
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={style.formLabel}>
        <p>
          Repository name
          {errors?.title && <span className={style.formError}>* Enter repository name</span>}
        </p>
        <input
          type="text"
          className={`input ${style.formInput}`}
          {...register('title', { required: true })}
          placeholder="Enter repository name"
        />
      </label>
      <label className={style.formLabel}>
        <p>Description</p>
        <textarea
          className={`input ${style.formInput}`}
          {...register('description')}
          placeholder="Enter description of this repository"
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
          defaultValue={values.priority}
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
          defaultValue={values.status}
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
          {...register('assignee')}
          defaultValue={values.assignee?.id}
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
        <button type="submit" className="button">
          Обновить
        </button>
        <button type="button" className="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
