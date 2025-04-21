import { Board } from '../../types';
import BoardItem from '../BoardItem/BoardItem';

type BoardListProps = {
  boards: Board[];
};

function BoardList({ boards }: BoardListProps) {
  return Boolean(boards.length) && boards.map((item) => <BoardItem key={item.id} board={item} />);
}

export default BoardList;
