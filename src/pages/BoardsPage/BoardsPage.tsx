import { useEffect } from 'react';
import BoardList from '../../components/BoardList/BoardList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoards } from '../../redux/thunks';
import { Loader } from '../../components/Loader/Loader';

function BoardsPage() {
  const { boards, isLoading, error } = useAppSelector((state) => state.boards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <div className="page">
      {isLoading ? <Loader /> : <BoardList boards={boards} />}
      {error && <div>Error occured</div>}
    </div>
  );
}
export default BoardsPage;
