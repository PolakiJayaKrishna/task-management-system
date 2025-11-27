import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';

const Tasks = () => {
    const { isAdmin } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await (isAdmin() ? taskService.getAllTasks() : taskService.getMyTasks());
            setTasks(data);
        } catch (error) {
            showMessage('error', 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await taskService.createTask(taskData);
            showMessage('success', 'Task created successfully!');
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            await taskService.updateTask(editingTask.id, taskData);
            showMessage('success', 'Task updated successfully!');
            setEditingTask(null);
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await taskService.deleteTask(id);
            showMessage('success', 'Task deleted successfully!');
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Failed to delete task');
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const filteredTasks = filter === 'ALL'
        ? tasks
        : tasks.filter(task => task.status === filter);

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-5xl font-bold gradient-text mb-2">Tasks</h1>
                        <p className="text-gray-400">
                            {isAdmin() ? 'Manage all tasks' : 'Manage your tasks'}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingTask(null);
                            setShowForm(true);
                        }}
                        className="btn-primary"
                    >
                        + Create Task
                    </button>
                </div>

                {/* Message Alert */}
                {message.text && (
                    <div className={`alert alert-${message.type} animate-fade-in`}>
                        {message.text}
                    </div>
                )}

                {/* Filters */}
                <div className="glass rounded-xl p-6 mb-8">
                    <div className="flex flex-wrap gap-3">
                        {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${filter === status
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'glass text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {status.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="spinner"></div>
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass rounded-xl p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
                        <p className="text-gray-400 mb-6">
                            {filter === 'ALL'
                                ? 'Create your first task to get started!'
                                : `No tasks with status "${filter.replace('_', ' ')}"`}
                        </p>
                        {filter !== 'ALL' && (
                            <button
                                onClick={() => setFilter('ALL')}
                                className="btn-secondary"
                            >
                                View All Tasks
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default Tasks;
