import React from 'react';
import UseAuth from '../UseAuth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
const useRole = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();


    const { data: role = '', isLoading, isError } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            if (!user?.email) return '';
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.userRole || '';
        },
        enabled: !!user?.email,
    });

    return { role, isLoading, isError };
};

export default useRole;