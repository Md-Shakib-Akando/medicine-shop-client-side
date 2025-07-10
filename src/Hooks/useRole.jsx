import React from 'react';
import UseAuth from '../UseAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const useRole = () => {
    const { user } = UseAuth();


    const { data: role = '', isLoading, isError } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            if (!user?.email) return '';
            const res = await axios.get(`http://localhost:5000/users/role/${user.email}`);
            return res.data.userRole || '';
        },
        enabled: !!user?.email,
    });

    return { role, isLoading, isError };
};

export default useRole;