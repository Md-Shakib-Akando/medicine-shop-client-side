import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInGoogle = () => {
        return signInWithPopup(auth, provider);
    }
    const updateUserProfile = ProfileInfo => {
        return updateProfile(auth.currentUser, ProfileInfo)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = {
        createUser,
        signInUser,
        logOut,
        loading,
        user,
        setUser,
        updateUserProfile,
        signInGoogle,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;