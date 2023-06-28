import React, { useEffect, useState } from 'react';
import { useUser } from '../Services/UserService';
import { AuthenticatedComponent } from '../Util/AuthenticatedComponent';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  const { obterFornecedores } = useUser();

  useEffect(() => {

    obterFornecedores().then(value => setSuppliers(value));

  }, []);

  return (
    <AuthenticatedComponent>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Lista de Fornecedores</h1>
        {suppliers.length == 0 ? (<span>Não existem fornecedores disponiveis</span>) : suppliers.map((supplier, index) => (
          <div style={{ border: '1px solid #000', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: 5, boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)' }} key={index}>
            <h2>{supplier.nome}</h2>
            <div>
              <span><b>Email: </b></span><span>{supplier.email}</span>
            </div>
          </div>
        ))}
      </div>
    </AuthenticatedComponent>
  );
}

export default SupplierList;