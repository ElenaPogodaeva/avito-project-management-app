import style from './Column.module.scss';
import { Task } from '../../types';
import TaskList from '../TaskList/TaskList';

export type ColumnProps = {
  title: string;
  tasks: Task[];
};

function Column({ title, tasks }: ColumnProps) {

  return (
    <div className={style.column}>
      <h3 className={style.columnTitle}>{title}</h3>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Column;
