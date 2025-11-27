import { useAuth } from '../context/AuthContext';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const { user, isAdmin } = useAuth();

    const canEdit = isAdmin() || task.createdBy?.id === user?.id;
    const canDelete = isAdmin();

    const getStatusBadge = (status) => {
        const badges = {
            TODO: 'badge-todo',
            IN_PROGRESS: 'badge-in-progress',
            DONE: 'badge-done',
        };
        return badges[status] || 'badge-todo';
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            LOW: 'badge-low',
            MEDIUM: 'badge-medium',
            HIGH: 'badge-high',
        };
        return badges[priority] || 'badge-medium';
    };

    return (
        <div className="glass rounded-xl p-6 card-hover animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{task.title}</h3>
                <div className="flex gap-2">
                    <span className={`badge ${getStatusBadge(task.status)}`}>
                        {task.status.replace('_', ' ')}
                    </span>
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-3">{task.description}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                    <p>Created by: <span className="text-purple-400">{task.createdBy?.username}</span></p>
                    {task.assignedTo && (
                        <p>Assigned to: <span className="text-pink-400">{task.assignedTo.username}</span></p>
                    )}
                </div>

                <div className="flex gap-2">
                    {canEdit && (
                        <button
                            onClick={() => onEdit(task)}
                            className="px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-all border border-blue-500/50"
                        >
                            Edit
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(task.id)}
                            className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-all border border-red-500/50"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
