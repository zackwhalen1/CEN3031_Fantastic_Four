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
        // Check for hardcoded student login first
        if (email === 'student@ufl.edu' && password === 'password') {
            // Create a mock user object for the hardcoded student
            const mockUser = {
                uid: 'hardcoded-student-uid',
                email: 'student@ufl.edu',
                displayName: 'Student User'
            };
            setCurrentUser(mockUser);
            // Return a resolved promise to match Firebase auth behavior
            return Promise.resolve({ user: mockUser });
        }
        
        // If not the hardcoded user, try Firebase authentication
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        // Handle logout for both hardcoded and Firebase users
        if (currentUser?.uid === 'hardcoded-student-uid') {
            setCurrentUser(null);
            return Promise.resolve();
        }
        return signOut(auth);
    }
    useEffect(() => onAuthStateChanged(auth, setCurrentUser), []);
    return (
        <AuthContext.Provider value={{currentUser, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}