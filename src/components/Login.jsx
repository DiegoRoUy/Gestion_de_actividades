import React, { useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi } from '../services/login';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, NavLink, Navigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate();



    useEffect(() => {
        let localStorage = window.localStorage;
        const id = localStorage.getItem("idUsuario");
        const token = localStorage.getItem("token");
        if (id && token) {
            //alert("logueado")// xq entra a este alert constantemente si no hubo cambios luego del logueo?
            navigate("/");
        }
    }, []);

    const usuarioRef = useRef()
    const passwordRef = useRef()
    const btnInciarSesionRef = useRef()


    const handlebtnLogin = () => {//Para que no este disponible el btn de login si no estan los dos campos con texto
        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;
        btnInciarSesionRef.current.disabled = !(usuario && password);
    }

    const handleLogin = async (event) => {

        try {
            event.preventDefault();
            const usuario = usuarioRef.current.value
            const password = passwordRef.current.value
            const usuarioLogin = await loginApi(usuario, password)           
            let localStorage = window.localStorage;
            localStorage.setItem("idUsuario", usuarioLogin.id);
            localStorage.setItem("token", usuarioLogin.token);
            navigate("/");

        } catch (e) {
            toast.error(e.message);
        }
    }
    const handleRegistrarse = () => {

        navigate("/registrarse");
    }

    return (
        <div className="form-container">
            
            <h2>Iniciar Sesión</h2>
            <Form onSubmit={handleLogin} onChange={handlebtnLogin}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control ref={usuarioRef} type="text" placeholder="Usuario" />
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" ref={btnInciarSesionRef} disabled>
                    Iniciar Sesión
                </Button>

                <Form.Text className="text-center" style={{ display: 'block', marginTop: '10px' }}>
                    <span>¿No tienes una cuenta? </span>
                    <span
                        className="register-link"
                        onClick={handleRegistrarse}
                    >
                        Regístrate
                    </span>
                </Form.Text>

                <ToastContainer />
            </Form>
        </div>


    )
}

export default Login



