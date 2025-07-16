import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const currentUserRole = 'admin';
    const handleRoleChange = (id, newRole) => {
        axios.put(`http://localhost:5000/users/${id}/role`, { role: newRole })
            .then(res => {

                setUsers(prevUsers => prevUsers.map(user =>
                    user._id === id ? { ...user, userRole: newRole } : user
                ));
                toast.success(`Role changed to ${newRole}`);
            })
            .catch(err => console.error(err));
    };
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="overflow-x-auto ">
                <table className="table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#00afb9] text-white">
                            <th className="p-4 border border-gray-300 text-center text-lg">Name</th>
                            <th className="p-4 border border-gray-300 text-center text-lg">Email</th>
                            <th className="p-4 border border-gray-300 text-center text-lg">Role</th>
                            {currentUserRole === 'admin' && <th className="p-4 text-center text-lg border border-gray-300">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-100 transition">
                                <td className="p-4 border border-gray-300 text-center text-[16px]">{user.userName}</td>
                                <td className="p-4 border border-gray-300 text-center text-[16px]">{user.userEmail}</td>
                                <td className="p-4 border border-gray-300 text-center text-[16px]">{user.userRole}</td>
                                {currentUserRole === 'admin' && (
                                    <td className="p-4 border border-gray-300 text-center">
                                        {user.userRole !== 'admin' && (
                                            <>
                                                {user.userRole === 'user' ? (
                                                    <button
                                                        className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700 transition"
                                                        onClick={() => handleRoleChange(user._id, 'seller')}
                                                    >
                                                        Make Seller
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600 transition"
                                                        onClick={() => handleRoleChange(user._id, 'user')}
                                                    >
                                                        Make User
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" reverseOrder={false} />
        </div>
    );
};

export default ManageUsers;