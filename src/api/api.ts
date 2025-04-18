import { Config, TaskCreate, TaskUpdate, UpdateStatus } from '../types';
import { BASE_URL } from './constants';

async function createResponse(
  url: string,
  method: string,
  body?: TaskCreate | TaskUpdate | UpdateStatus
) {
  try {
    const config: Config = {
      method,
      headers: {},
    };

    if (body) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const getBoards = () => {
  const url = `${BASE_URL}/boards`;
  return createResponse(url, 'GET');
};

export const getBoardTasks = (boardId: number) => {
  const url = `${BASE_URL}/boards/${boardId}`;
  return createResponse(url, 'GET');
};

export const getTasks = () => {
  const url = `${BASE_URL}/tasks`;
  return createResponse(url, 'GET');
};

export const getTaskById = (taskId: number) => {
  const url = `${BASE_URL}/tasks/${taskId}`;
  return createResponse(url, 'GET');
};

export const createTask = (body: TaskCreate) => {
  const url = `${BASE_URL}/tasks/create`;
  return createResponse(url, 'POST', body);
};

export const updateTask = (taskId: number, body: TaskUpdate) => {
  const url = `${BASE_URL}/tasks/update/${taskId}`;
  return createResponse(url, 'PUT', body);
};

export const updateTaskStatus = (taskId: number, body: UpdateStatus) => {
  const url = `${BASE_URL}/tasks/updateStatus/${taskId}`;
  return createResponse(url, 'PUT', body);
};
