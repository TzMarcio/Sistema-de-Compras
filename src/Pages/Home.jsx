import React, { useEffect } from 'react';
import { useAuth } from '../Services/AuthService';
import { useNavigate } from "react-router-dom";
import { AuthenticatedComponent } from '../Util/AuthenticatedComponent';

const Home = () => {

  return (
    <AuthenticatedComponent>
      <h1>Página inicial</h1>
    </AuthenticatedComponent>
  );
}

export default Home;