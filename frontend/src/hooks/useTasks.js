import { useState, useCallback } from 'react';
import api from '../utils/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/tasks', { params: { limit: 8, ...params } });
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    return data.data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data.data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
  };

  const toggleComplete = async (id) => {
    const { data } = await api.patch(`/tasks/${id}/complete`);
    return data.data;
  };

  return { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleComplete };
};
