import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import style from './TaskItem.module.scss';
import { Task, TaskFormValues, TaskUpdate } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { updateStatus, updateTaskById } from '../../redux/thunks';
import Modal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps) {
  const { id, title, description, boardId, priority, status, assignee } = task;

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setIsEdit(false);
  };

  const handleSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    const updatedValues = {
      assigneeId: Number(data.assigneeId),
      description: data.description,
      priority: data.priority,
      status: data.status,
      title: data.title,
    } as TaskUpdate;

    await dispatch(updateTaskById({ taskId: id, task: updatedValues }));
    // await dispatch(updateStatus({taskId: id, }));
    setIsEdit(false);
  };

  return (
    <div className={style.item} onClick={() => setIsEdit(true)}>
      <h2 className={style.itemTitle}>{title}</h2>
      <p>{description}</p>
      {isEdit && (
        <Modal>
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={handleClick}
            values={{
              title,
              description,
              boardId,
              priority,
              status,
              assigneeId: assignee.id,
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default TaskItem;
