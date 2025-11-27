import api from './api';

export const taskService = {
    getAllTasks: async (page = 0, size = 10, sortBy = 'createdAt') => {
        const response = await api.get(`/tasks?page=${page}&size=${size}&sortBy=${sortBy}`);
        return response.data;
    },

    getMyTasks: async () => {
        const response = await api.get('/tasks/my-tasks');
        return response.data;
    },

    getTaskById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    updateTask: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    deleteTask: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};

export default taskService;
