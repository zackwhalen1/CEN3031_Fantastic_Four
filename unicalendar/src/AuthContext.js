import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }
    useEffect(() => onAuthStateChanged(auth, user => {
        setCurrentUser(user);
    }), []);
    return (
        <AuthContext.Provider value={{currentUser, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}