import React, { useRef } from 'react';
import { useAuth } from '../Services/AuthService';
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      alert('Falha ao entrar na conta');
    }
  }

  const onCadastrar = () => navigate('/signup');

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          <span>Email:</span>
          <div className='input-area'>
            <input type="email" ref={emailRef} required />
          </div>
        </div>
        <div className='card'>
          <span>Senha:</span>
          <div className='input-area'>
            <input type="password" ref={passwordRef} required />
          </div>
        </div>
        <button style={{ width: '100%' }} type="submit">Entrar</button>
        <button style={{ width: '100%' }} onClick={() => onCadastrar()}>Cadastre-se</button>
      </form>
    </div>
  );
}

export default Login;