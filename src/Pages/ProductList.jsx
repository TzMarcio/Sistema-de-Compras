import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useProduct } from '../Services/ProductService';
import { AuthenticatedComponent } from '../Util/AuthenticatedComponent';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const { getProducts } = useProduct();

  useEffect(() => {
    getProducts().then(values => setProducts(values));
  }, []);

  return (
    <AuthenticatedComponent>
      <div>
        <h1>Lista de Produtos</h1>
        {products.length == 0 ? (<span>Não existem Produtos disponiveis</span>) : products.map((product, index) => (
          <div style={{ border: '1px solid #000', padding: '10px', marginBottom: 5, borderRadius: '5px', textAlign: 'center', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)' }} key={index}>
            <h2>{product.name}</h2>
            <div>
              <p><b>Descrição:</b> {product.description}</p>
              <p><b>R$</b> {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </AuthenticatedComponent>
  );
}

export default ProductList;