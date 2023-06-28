import { getDoc, collection, doc, updateDoc, setDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, createContext, useContext, useState } from 'react';
import { firestore } from "../Config/firebaseConfig";
import { AuthContext } from './AuthService';

export const UserContext = createContext();

const usersRef = collection(firestore, "usuarios");

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {

  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState('');
  const { user, currentUser } = useContext(AuthContext);

  const onAtualizarUsuario = async (user, data) => {

    return new Promise((resolve, reject) => {

      getDoc(doc(usersRef, user.uid)).then(value => {

        if (value.exists()) {

          updateDoc(doc(usersRef, user.uid), data)
            .then(() => {
              setPerfil(data.perfil);
              resolve()
            })
            .catch(e => reject(e));

        } else {

          setDoc(doc(usersRef, user.uid), data)
            .then(() => {
              setPerfil(data.perfil);
              resolve();
            })
            .catch(e => reject(e));

        }

      }).catch(e => reject(e));

    });


  }

  const obterFornecedores = async () => {

    return new Promise(async (resolve, reject) => {

      const querySelector = query(usersRef, where("perfil", "==", 'GERENTE'));

      getDocs(querySelector).then(querySnapshot => {

        const data = [];

        querySnapshot.forEach(doc => data.push(doc.data()));

        resolve(data);

      }).catch((e) => reject(e));

    });

  }

  useEffect(() => {
    if (currentUser) {

      const unsub = onSnapshot(doc(usersRef, user().uid), (doc) => {
        setPerfil(doc.data().perfil);
      });

      return unsub;

    }

  }, [currentUser]);

  const value = {
    onAtualizarUsuario,
    obterFornecedores,
    perfil,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}