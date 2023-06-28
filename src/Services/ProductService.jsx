import { getDoc, collection, doc, updateDoc, setDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, createContext, useContext, useState } from 'react';
import { firestore } from '../Config/firebaseConfig';
import { useAuth } from './AuthService';
import { useUser } from './UserService';

export const ProductContext = createContext();

const productsRef = collection(firestore, 'produtos');

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { perfil } = useUser();

  const addProduct = (product) => {

    return setDoc(doc(productsRef), { ...product, owner: user().uid });

  }

  const getProducts = () => {

    return new Promise((resolve, reject) => {

      const querySelector = query(productsRef, where("owner", "==", user().uid));

      getDocs(perfil == 'ADMINISTRADOR' ? productsRef : querySelector).then(querySnapshot => {

        const data = [];

        querySnapshot.forEach(doc => data.push(doc.data()));

        resolve(data);

      }).catch((e) => reject(e));

    });

  }


  useEffect(() => {


  }, []);

  const value = {
    addProduct,
    getProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  );
}