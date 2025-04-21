import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import style from './Header.module.scss';
import Modal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import { TaskCreate, TaskFormValues } from '../../types';
import { addTask } from '../../redux/thunks';
import { useAppDispatch } from '../../redux/hooks';

function Header() {
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

  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <nav className={style.headerMenu}>
          <ul className={style.menuList}>
            <li>
              <NavLink to="/tasks" className={style.menuLink}>
                Все задачи
              </NavLink>
            </li>
            <li>
              <NavLink to="/boards" className={style.menuLink}>
                Проекты
              </NavLink>
            </li>
          </ul>
        </nav>
        <button type="button" className={`button ${style.itemBtn}`} onClick={() => setIsEdit(true)}>
          Создать задачу
        </button>
      </div>
      {isEdit && (
        <Modal>
          <TaskForm onSubmit={handleSubmit} onCancel={handleClick} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
