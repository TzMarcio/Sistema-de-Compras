import React, { useRef, useState } from 'react';
import { useAuth } from '../Services/AuthService';
import { useUser } from '../Services/UserService';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nome: '',
    perfil: 'ADMINISTRADOR',
  });
  const { signup, user, currentUser, remove } = useAuth();
  const { onAtualizarUsuario } = useUser();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(form.email, form.password);
      await onAtualizarUsuario(user(), { ...form, id: user().uid });
      navigate('/');
    } catch (e) {
      remove(user())
      alert('Falha ao criar a conta');
    }
  }

  const onVoltar = () => navigate('/login');

  return (
    <div className='cadastro'>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          <span>Email:</span>
          <div className='input-area'>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
        </div>
        <div className='card'>
          <span>Senha:</span>
          <div className='input-area'>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
        </div>
        <div className='card'>
          <span>Nome:</span>
          <div className='input-area'>
            <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </div>
        </div>
        <div className='card'>
          <span>Perfil:</span>
          <div className='input-area'>
            <select name="perfil" value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })} required>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option value="GERENTE">GERENTE DE COMPRAS</option>
            </select>
          </div>
        </div>
        <button style={{ width: '100%' }} type="submit">Cadastrar</button>
        <button style={{ width: '100%' }} onClick={() => onVoltar()}>Voltar</button>
      </form>
    </div>
  );
}

export default Signup;