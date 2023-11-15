import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.wallet.currencies)
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/carteira' element={<Wallet />}/>
    </Routes>
  );
}

export default App;
