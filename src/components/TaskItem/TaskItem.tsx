import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import style from './TaskItem.module.scss';
import { Task, TaskFormValues, TaskUpdate } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { updateTaskById } from '../../redux/thunks';

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps) {
  const { id, title, description, boardId, priority, status, assignee } = task;

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();


  return (
    <div className={style.item} onClick={() => setIsEdit(true)}>
      <h2 className={style.itemTitle}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default TaskItem;
