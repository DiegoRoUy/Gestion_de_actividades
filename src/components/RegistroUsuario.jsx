import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { registrarUsuarioAPI } from "../services/registrarUsuario";
import { obtenerPaisesAPI } from "../services/servicios"
import { Navigate, useNavigate } from 'react-router-dom';
import { cargaDePaisesSlice } from '../slices/feature/registrosUsuSlices';
import CircularIndeterminate from './CircularIndeterminate';
const RegistroUsuario = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    /*     const resultado = useSelector((state) => state.registrosUsuSlices); */
    const usuRef = useRef();
    const passRef = useRef();
    const idPaisRef = useRef();
    const btnRegistrarRef = useRef();
    const [paises, setPaises] = useState([]);

    useEffect(() => {

        cargarPaises();
    }, []);


    const cargarPaises = async () => {
        const resultadoPaises = await obtenerPaisesAPI();//devuelve el resultado (incluido el codigo 200)
        dispatch(cargaDePaisesSlice(resultadoPaises.paises))       //lo almacenamos en el store
        setPaises(resultadoPaises.paises)
    };


    const handleForm = () => {//Para que no este disponible el btn de registrar si no estan los dos campos con texto
        const usuario = usuRef.current.value;
        const password = passRef.current.value;
        btnRegistrarRef.current.disabled = !(usuario && password);
    }


    const handleRegistrar = async (event) => {
        try {
            event.preventDefault();//se previene la recarga
            const usuario = usuRef.current.value;
            const password = passRef.current.value;
            const idPais = idPaisRef.current.value;


            btnRegistrarRef.current.disabled = !(usuario && password);
            if (idPais != "seleccionado") {
                const resultado = await registrarUsuarioAPI(usuario, password, idPais);
                let localStorage = window.localStorage;
                localStorage.setItem("idUsuario", resultado.id);
                localStorage.setItem("token", resultado.token);
                toast.success("Usuario registrado con éxito!");
                navigate("/");
            } else {
                toast.error("Debe seleccionar un pais");
            }
        }
        catch (e) {
            toast.error(e.message);
        }

    }

    const handleVolver = () => {
        navigate("/login");
    }
    return (
        <>
            <Form onChange={handleForm} onSubmit={handleRegistrar} className="form-container">
                <h2>Registrarse</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control ref={usuRef} type="text" placeholder="Usuario..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Contraseña..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>País de residencia</Form.Label>
                    {paises.length === 0 ? (
                        <CircularIndeterminate />
                    ) : (
                        <Form.Select ref={idPaisRef}>
                            <option value="seleccionado">Selecciona país</option>
                            {paises.map((pais) => (
                                <option key={pais.id} value={pais.id}>
                                    {pais.name}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" ref={btnRegistrarRef} disabled>Registrarse</Button>

                <Form.Text className="text-center" style={{ display: 'block', marginTop: '10px' }}>
                    <span
                        className="register-link"
                        onClick={handleVolver}
                    >
                        Volver
                    </span>
                </Form.Text>
                <ToastContainer />
            </Form>
        </>
    )
}

export default RegistroUsuario;







