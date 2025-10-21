import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { eliminarEvaluacionAPI, obtenerObjetivosAPI } from '../services/servicios';
import { toast, ToastContainer } from 'react-toastify';
import { eliminarEvaluacionesSlices } from '../slices/feature/evaluacionesSlices';
import CircularIndeterminate from './CircularIndeterminate';
import { useObjetivo } from '../util/useObjetivo';
/* import { useObjetivo } from '../util' */


const Evaluacion = ({ id, idObjetivo, calificacion, fecha }) => {

    const [objetivos, setObjetivos] = useState([]);
    const dispatch = useDispatch();
    const resultado = useSelector((state) => state.objetivosSlices)
    useEffect(() => {//Aqui es para traer los objetivos a la tabla

        getObjetivos();


    }, [resultado]);

    const getObjetivos = () => {
        setObjetivos(resultado);

    }
    //const obtenerNom = useObjetivo();   
    const obtenerNom = (idObjetivo) => {
        const objetivoEncontrado = objetivos.find(ob => ob.id == idObjetivo);
        return objetivoEncontrado ? objetivoEncontrado : "No se hallo";
    }
    const idUser = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("token");


    const handleEliminar = async (e) => {
        try {
            const resultado = await eliminarEvaluacionAPI(id, idUser, token)
            dispatch(eliminarEvaluacionesSlices(id));
            toast.success("Evaluación eliminada con éxito!");
        } catch (e) {
            toast.error(error.message);
        }
    }/* 
    const url = "https://goalify.develotion.com/imgs/"; */

    const getEmoji = (code) => {
        const number = parseInt(code.substring(2));
        return String.fromCodePoint(number);
    }

    return (
        <>
            <tr>

                <td>{obtenerNom(idObjetivo).nombre} </td>
                <td>{calificacion}</td>
                <td>{fecha}</td>
                <td>
                    {objetivos.length > 0 && obtenerNom(idObjetivo)?.emoji
                        ? getEmoji(obtenerNom(idObjetivo).emoji)
                        : <CircularIndeterminate />}

                </td>
                <td> <button onClick={handleEliminar}>Eliminar</button></td>


            </tr>
        </>

    )
}

export default Evaluacion