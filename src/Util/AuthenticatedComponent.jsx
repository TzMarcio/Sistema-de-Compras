import React, { useEffect } from 'react';
import { useAuth } from '../Services/AuthService';
import { useNavigate } from "react-router-dom";

export const AuthenticatedComponent = ({ children }) => {

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}