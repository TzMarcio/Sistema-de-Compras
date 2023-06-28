import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Services/UserService';

function SideMenu() {

  const { perfil } = useUser();

  return (
    <div style={styles.sideMenu}>
      <ul style={styles.ulStyle}>
        <li style={styles.liStyle}>
          <Link style={styles.linkStyle} to="/">Home</Link>
        </li>
        <li style={styles.liStyle}>
          <Link style={styles.linkStyle} to="/products">Produtos</Link>
        </li>
        <li style={styles.liStyle}>
          <Link style={styles.linkStyle} to="/add-product">Adicionar Produto</Link>
        </li>
        {perfil == 'ADMINISTRADOR' ? (
          <li style={styles.liStyle}>
            <Link style={styles.linkStyle} to="/suppliers">Fornecedores</Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

const styles = {
  sideMenu: {
    height: '100vh',
    width: '250px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    overflowX: 'hidden',
  },
  ulStyle: {
    listStyleType: 'none',
    margin: 0,
    padding: 10,
  },
  liStyle: {
    marginBottom: '20px',
  },
  linkStyle: {
    textDecoration: 'none',
    fontSize: '18px',
    color: 'white',
    display: 'block',
  }
};

export default SideMenu;