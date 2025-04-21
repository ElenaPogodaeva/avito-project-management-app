import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import style from './BoardPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoard } from '../../redux/thunks';
import { Status } from '../../types';
import Column from '../../components/Column/Column';

function BoardPage() {
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const boardId = Number(useParams().id);

  const columns = [
    { title: 'К выполнению', status: Status.Backlog },
    { title: 'В работе', status: Status.InProgress },
    { title: 'Выполнено', status: Status.Done },
  ];

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, []);

  if (isLoading) return <div className="">Loading</div>;
  if (error) return <div className="">Error occured</div>;

  return (
    <>
      <h2 className={style.boardTitle}>Задачи проекта</h2>
      <section className={style.columnList}>
        {columns.map((item) => (
          <Column title={item.title} tasks={tasks.filter((task) => task.status === item.status)} />
        ))}
      </section>
    </>
  );
}

export default BoardPage;
