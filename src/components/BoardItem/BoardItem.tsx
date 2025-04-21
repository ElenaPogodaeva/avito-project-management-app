import { useNavigate } from 'react-router-dom';
import style from './BoardItem.module.scss';
import { Board } from '../../types';

type BoardItemProps = {
  board: Board;
};

function BoardItem({ board }: BoardItemProps) {
  const { id, name, description, taskCount } = board;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${id}`);
  };

  return (
    <div className={style.item}>
      <h2 className={style.itemTitle}>{name}</h2>

      <p>{description}</p>
      <p className={style.itemInfo}>Количество задач: {taskCount}</p>

      <button type="button" className={`button ${style.itemBtn}`} onClick={handleClick}>
        Перейти к доске
      </button>
    </div>
  );
}

export default BoardItem;
