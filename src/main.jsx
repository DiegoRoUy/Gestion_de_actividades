import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from './slices/store.js';
import Rutas from './components/Rutas.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Rutas></Rutas>
  </Provider>

)
