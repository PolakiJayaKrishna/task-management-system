import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { taskService } from '../services/taskService';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await (isAdmin() ? taskService.getAllTasks() : taskService.getMyTasks());
            setTasks(data);
            calculateStats(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (tasksData) => {
        setStats({
            total: tasksData.length,
            todo: tasksData.filter((t) => t.status === 'TODO').length,
            inProgress: tasksData.filter((t) => t.status === 'IN_PROGRESS').length,
            done: tasksData.filter((t) => t.status === 'DONE').length,
        });
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl font-bold text-white mb-2">
                        Welcome back, <span className="gradient-text">{user?.username}</span>! 👋
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {isAdmin() ? 'You have full administrative access' : 'Here\'s what you\'re working on'}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass rounded-xl p-6 card-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Tasks</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <span className="text-3xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6 card-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">To Do</p>
                                <p className="text-4xl font-bold text-blue-400 mt-2">{stats.todo}</p>
                            </div>
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <span className="text-3xl">📝</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6 card-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">In Progress</p>
                                <p className="text-4xl font-bold text-yellow-400 mt-2">{stats.inProgress}</p>
                            </div>
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                <span className="text-3xl">⚡</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6 card-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Completed</p>
                                <p className="text-4xl font-bold text-green-400 mt-2">{stats.done}</p>
                            </div>
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                <span className="text-3xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/tasks" className="btn-primary text-center">
                            View All Tasks
                        </Link>
                        <Link to="/tasks?action=create" className="btn-secondary text-center">
                            Create New Task
                        </Link>
                        {isAdmin() && (
                            <button className="btn-secondary">
                                View All Users
                            </button>
                        )}
                    </div>
                </div>

                {/* Recent Tasks */}
                <div className="glass rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Tasks</h2>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="spinner"></div>
                        </div>
                    ) : tasks.length > 0 ? (
                        <div className="space-y-4">
                            {tasks.slice(0, 5).map((task) => (
                                <div key={task.id} className="glass rounded-lg p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold">{task.title}</h3>
                                            <p className="text-gray-400 text-sm truncate">{task.description}</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <span className={`badge badge-${task.status.toLowerCase().replace('_', '-')}`}>
                                                {task.status}
                                            </span>
                                            <span className={`badge badge-${task.priority.toLowerCase()}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-12">
                            No tasks yet. Create your first task to get started!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
