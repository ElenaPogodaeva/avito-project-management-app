import { Task } from '../../types';
import TaskItem from '../TaskItem/TaskItem';

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return Boolean(tasks.length) && tasks.map((item) => <TaskItem key={item.id} task={item} />);
}

export default TaskList;
