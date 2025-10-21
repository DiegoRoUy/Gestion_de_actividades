import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Evaluacion from './Evaluacion';
import { useSelector } from 'react-redux';
import CircularIndeterminate from './CircularIndeterminate'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Evaluaciones = () => {

    const resultado = useSelector((state) => state.evaluacionesSlices);


    const [evaluacionesFiltradas, setevaluacionesFiltradas] = useState([]);
    const [evaluacionesOriginales, setEvaluacionesOriginales] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (resultado.length >= 0) {
            setEvaluacionesOriginales(resultado);
            setevaluacionesFiltradas(resultado);
            setLoading(false);
        }

    }, [resultado]);




    const convertirFecha = (fechaString) => {
        return new Date(fechaString + 'T00:00:00'); // evitar problemas de zona horaria
    };


    const handleFiltroSemana = () => {
        const hoy = new Date();
        const hace7Dias = new Date();
        hace7Dias.setDate(hoy.getDate() - 7);

        const filtradas = evaluacionesOriginales.filter(e => {
            const fechaEval = convertirFecha(e.fecha);
            return fechaEval >= hace7Dias && fechaEval <= hoy;
        });

        setevaluacionesFiltradas(filtradas);
    };


    const handleFiltroMes = () => {
        const hoy = new Date();
        const hace30Dias = new Date();
        hace30Dias.setDate(hoy.getDate() - 30);

        const filtradas = evaluacionesOriginales.filter(e => {
            const fechaEval = convertirFecha(e.fecha);
            return fechaEval >= hace30Dias && fechaEval <= hoy;
        });

        setevaluacionesFiltradas(filtradas);
    };


    const handleFiltroHistorico = () => {
        setevaluacionesFiltradas(evaluacionesOriginales);
    };




    return (
        <div className="table-container">

            <h2 className="text-center text-primary my-4">Lista de evaluaciones</h2>

            <ButtonGroup className="mb-2">
                <Button onClick={handleFiltroSemana}>Filtro semanal</Button>
                <Button onClick={handleFiltroMes}>Filtro mensual</Button>
                <Button onClick={handleFiltroHistorico}>Historico</Button>
            </ButtonGroup>

            {/* Mostramos el spinner mientras está cargando */}
            {loading ? (
                <div className="loading-container">
                    <CircularIndeterminate />
                </div>
            ) : (

                <Table striped bordered hover>
                    <thead >
                        <tr>
                            <th>Nombre Objetivo</th>
                            <th>Calificación</th>
                            <th>Fecha</th>
                            <th>Emoji</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody className="scrollable-table-body">
                        {evaluacionesFiltradas.length === 0 ? (
                            <tr>
                                <td colSpan="5">No hay evaluaciones disponibles.</td>
                            </tr>
                        ) : (
                            evaluacionesFiltradas.map((evaluacion) => (
                                <Evaluacion
                                    key={evaluacion.id}
                                    id={evaluacion.id}
                                    idObjetivo={evaluacion.idObjetivo}
                                    calificacion={evaluacion.calificacion}
                                    fecha={evaluacion.fecha}
                                    eliminar
                                />
                            ))
                        )}
                    </tbody>
                </Table>

            )}
        </div>
    );
};


export default Evaluaciones



