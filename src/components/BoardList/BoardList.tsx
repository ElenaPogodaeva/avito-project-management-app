import { Board } from '../../types';
import BoardItem from '../BoardItem/BoardItem';
import style from './BoardList.module.scss';

type BoardListProps = {
  boards: Board[];
};

function BoardList({ boards }: BoardListProps) {
  console.log(boards);
  return (
    <div className={style.cards}>
      {Boolean(boards.length) && boards.map((item) => <BoardItem key={item.id} board={item} />)}
    </div>
  );
}

export default BoardList;
