import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css"

import { HashRouter, Route, Routes } from 'react-router-dom';

import Countries from './components/Countries';
import CountriesSingle from './components/CountriesSingle';
import Favourites from './components/Favourites';
import Home from './components/Home';
import Layout from './pages/Layout';
import Login from './components/Login';
import NotFoundError from './components/NotFoundError';
import ProtectedRoute from './auth/ProtectedRoute';
import React from 'react';
import Register from './components/Register';
import { auth } from './auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user] = useAuthState(auth)
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute user={user} />}>

            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
          <Route path="/*" element={<NotFoundError />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
