import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from '../App';
import RegistroUsuario from './RegistroUsuario';
import Dashboard from './Dashboard';
import Login from './Login';
//import Menu from './Menu';
import AgregarEvaluacion from './AgregarEvaluacion';


const ProtectedRoute = ({ element, ...rest }) => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirige cualquier ruta no encontrada a /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />


                <Route path="/registrarse" element={<RegistroUsuario />} />

                {/* Ruta de Login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta protegida, solo accesible si el usuario está autenticado */}
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} >
                   {/*  <Route index element={<App />} /> */}
                    {/* <Route path="menu" element={<Menu />} /> */}
                    {/* Aca podemos agregar otras rutas protegidas como 'graficasCompletadas', etc. */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;