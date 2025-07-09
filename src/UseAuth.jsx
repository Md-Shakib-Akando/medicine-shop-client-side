import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;