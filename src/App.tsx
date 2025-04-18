import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import BoardPage from './pages/BoardPage/BoardPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import TasksPage from './pages/TasksPage/TasksPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="boards" replace />} />
        <Route path="boards" element={<BoardsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="boards/:id" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
