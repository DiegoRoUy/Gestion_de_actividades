import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { agregarEvalucionAPI, obtenerObjetivosAPI } from '../services/servicios';
import { agregarEvaluacionesSlice } from '../slices/feature/evaluacionesSlices';
import { toast } from 'react-toastify'
/* import { cargaDeObjetivosSlice } from '../slices/feature/objetivosSlices'; */

const AgregarEvaluacion = () => {

    const dispatch = useDispatch()
    const [objetivos, setObjetivos] = useState([]);
    const [fecha, setFecha] = useState("");
    const resultado = useSelector((state) => state.objetivosSlices)

    useEffect(() => {

        getObjetivos();

    }, [resultado]);

    const getObjetivos = () => {
        setObjetivos(resultado);
    }


    const idObjetivoRef = useRef();
    const calificacionRef = useRef();
    const id = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("token");
    /*    function obtenerFechaHoy() {
           const fecha = new Date();
           const año = fecha.getFullYear();
           const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  // Los meses empiezan en 0
           const dia = fecha.getDate().toString().padStart(2, '0');
   
           return `${año}-${mes}-${dia}`;
       } */
    const obtenerFechaHoy = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');

        return `${año}-${mes}-${dia}`;
    };

    const handleAgregar = async (event) => {
        try {
            event.preventDefault();//se previene la recarga
            const idObjetivo = idObjetivoRef.current.value;
            const calificacion = calificacionRef.current.value;
            const today = obtenerFechaHoy();
            if (fecha && fecha <= today) {
                if (idObjetivo != "seleccionado" && calificacion !== "" && calificacion >= -5 && calificacion <= 5) {
                    const nuevaEvaluacion = {
                        idObjetivo: idObjetivo,
                        idUsuario: id,
                        calificacion: calificacion,
                        fecha: fecha
                    }
                    const resultado = await agregarEvalucionAPI(nuevaEvaluacion, id, token);
                    if (resultado) {
                        const res = {
                            id: resultado.id,
                            ...nuevaEvaluacion
                        }
                        dispatch(agregarEvaluacionesSlice(res));
                        idObjetivoRef.current.value = "seleccionado";
                        calificacionRef.current.value = "";
                        setFecha("");
                        toast.success("Evaluación registrada con éxito!");
                    }
                }
                else {
                    toast.error("Verificar los datos cargados");//avisar que tiene que seleccionar un objetivo
                }
            } else {
                toast.error("La fecha de la evaluación no puede ser vacia ni posterior a hoy");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const handleFechaChange = (date) => {
        if (date) {
            const fechaFormateada = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
            setFecha(fechaFormateada);
        }
    };
    return (
        <>
            <Form >
                <Form.Group className="mb-3" >
                    <h2 className="text-center text-primary my-4">Agregar evaluaciones</h2>
                    <Form.Label >Objetivos:</Form.Label>
                    <Form.Select ref={idObjetivoRef} >
                        <option value="seleccionado">Seleccionar Objetivo</option>
                        {objetivos.map((objetivo) => (
                            <option key={objetivo.id} value={objetivo.id}>
                                {objetivo.nombre}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label>Calificación:</Form.Label>
                    <Form.Control ref={calificacionRef} type="text" placeholder="Calificación entre -5 y 5" className="mb-3" />
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha:</Form.Label>
                        <DatePicker
                            selected={fecha ? new Date(`${fecha}T12:00:00`) : null}
                            onChange={handleFechaChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona una fecha"
                            className="form-control"  // <-- aquí la clase Bootstrap
                        />
                    </Form.Group>


                </Form.Group>

                <Button className="mb-4" variant="primary" type="submit" onClick={handleAgregar}>
                    Agregar
                </Button>

            </Form >
        </>
    )
}

export default AgregarEvaluacion