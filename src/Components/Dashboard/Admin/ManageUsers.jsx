import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const currentUserRole = 'admin';
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            {currentUserRole === 'admin' && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.userName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userRole}</td>
                                {currentUserRole === 'admin' && (
                                    <td>
                                        {user.userRole !== 'admin' && (
                                            <>
                                                {user.userRole === 'user' ? (
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                    // onClick={() => handleRoleChange(user._id, 'seller')}
                                                    >
                                                        Make Seller
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-warning"
                                                    // onClick={() => handleRoleChange(user._id, 'user')}
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
        </div>
    );
};

export default ManageUsers;