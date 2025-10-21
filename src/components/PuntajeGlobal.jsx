import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { puntajeGlobalSlice } from '../slices/feature/puntajesSlices';


const PuntajeGlobal = () => {
    const resultado = useSelector((state) => state.evaluacionesSlices);
    const [puntajeGlobal, setPuntajeGlobal] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        calcularPuntajeGlobal();
    }, [resultado]);

    const calcularPuntajeGlobal = () => {
        let auxPromedio = 0;
        const suma = resultado.reduce(  // Sumamos calificaciones asegurando convertir a número (acepta negativos)
            (puntaje, e) => puntaje + Number(e.calificacion), 0
        );
        if (resultado && resultado.length > 0) {
            auxPromedio = suma / resultado.length;

        }
        dispatch(puntajeGlobalSlice(auxPromedio))
        setPuntajeGlobal(auxPromedio);

    };





    return (
        <Card border="info" style={{ width: '11rem' }}>
            <Card.Header>Puntaje Global</Card.Header>
            <Card.Body>
                <Card.Title>{puntajeGlobal.toFixed(2)}</Card.Title>
                <Card.Text>

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PuntajeGlobal