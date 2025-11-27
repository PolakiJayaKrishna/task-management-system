import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass border-b border-white/20 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">T</span>
                        </div>
                        <span className="text-white font-bold text-xl gradient-text">
                            TaskFlow
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/dashboard"
                            className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/tasks"
                            className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            Tasks
                        </Link>
                    </div>

                    {/* User Menu */}
                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-right">
                                <p className="text-white font-semibold">{user.username}</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {isAdmin() && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-semibold">
                                        ADMIN
                                    </span>
                                )}
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-semibold border border-purple-500/50">
                                    {user.role}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors border border-red-500/50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
