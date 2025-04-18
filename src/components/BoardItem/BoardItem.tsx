import style from './BoardItem.module.scss';
import { Board } from '../../types';

type BoardItemProps = {
  board: Board;
};

function BoardItem({ board }: BoardItemProps) {
  const { id, name, description, taskCount } = board;

  return (
    <div className={style.item}>
      <a href="" target="_blank" rel="noreferrer">
        <h2 className={style.itemTitle}>{name}</h2>
      </a>

      <p>{description}</p>
      <p className={style.itemInfo}>Количество задач: {taskCount}</p>

      <button type="button" className={`button ${style.itemBtn}`}>
        Перейти к доске
      </button>
    </div>
  );
}

export default BoardItem;
