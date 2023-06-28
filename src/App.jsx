import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './Services/AuthService';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SupplierList from './Pages/SupplierList';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import SideMenu from './Components/SideMenu';
import './App.css';

const App = () => {

  const location = useLocation();
  const excludedPaths = ['/login', '/signup'];
  const shouldShowSideMenu = !excludedPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <div style={{ display: 'flex' }}>
        {shouldShowSideMenu && <SideMenu />}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route index path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;