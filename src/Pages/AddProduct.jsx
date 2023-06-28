import React, { useRef } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useProduct } from '../Services/ProductService';
import { AuthenticatedComponent } from '../Util/AuthenticatedComponent';

function AddProduct() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const { addProduct } = useProduct();

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      addProduct({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value
      }).then();

      nameRef.current.value = '';
      descriptionRef.current.value = '';
      priceRef.current.value = '';

    } catch (error) {
      alert('Erro ao adicionar produto');
    }
  }

  return (
    <AuthenticatedComponent>
      <div>
        <h1>Adicionar Produto</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={nameRef} placeholder="Nome do Produto" required />
          <input type="text" ref={descriptionRef} placeholder="Descrição do Produto" required />
          <input type="number" ref={priceRef} placeholder="Preço do Produto" required />
          <button type="submit">Adicionar Produto</button>
        </form>
      </div>
    </AuthenticatedComponent>
  );
}

export default AddProduct;