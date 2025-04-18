import { useEffect, useState } from 'react';
import { getBoards } from '../../api/api';
import BoardList from '../../components/BoardList/BoardList';

function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoards = async () => {
    setIsLoading(true);
    try {
      const boards = await getBoards();
      setBoards(boards.data);
    } catch (err) {
      setBoards([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return <BoardList boards={boards} />;
}

export default BoardsPage;
