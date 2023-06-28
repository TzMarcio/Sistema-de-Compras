import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../Config/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { UserProvider } from './UserService';
import { ProductProvider } from './ProductService';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function update(user, data) {
    return updateProfile(user, data);
  }

  function remove(user) {
    return deleteUser(user);
  }

  function user() {
    return auth.currentUser;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    update,
    remove,
    user
  };

  return (
    <AuthContext.Provider value={value}>
      <UserProvider>
        <ProductProvider>
          {!loading && children}
        </ProductProvider>
      </UserProvider>
    </AuthContext.Provider>
  );
}