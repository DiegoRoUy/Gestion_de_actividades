import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';

const PuntajeDiario = () => {
    const resultado = useSelector((state) => state.evaluacionesSlices);
    const [puntajeDiario, setPuntajeDiario] = useState(0);

    useEffect(() => {
        calcularPuntajeDiario();
    }, [resultado]);

    const obtenerFechaHoy = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');

        return `${año}-${mes}-${dia}`;
    };
    const calcularPuntajeDiario = () => {
        if (!resultado || resultado.length === 0) {
            setPuntajeDiario(0);
            return;
        }
        const hoy = obtenerFechaHoy();
        const formatoFecha = (fecha) => new Date(fecha).toISOString().split('T')[0];//formato string de la fecha yyyy-MM-dd
        const hoyStr = formatoFecha(hoy);    
        const evaluacionesDeHoy = resultado.filter( // para filtrar las evaluaciones al dia actual
            (e) => formatoFecha(e.fecha) === hoyStr
        );     
        if (evaluacionesDeHoy.length === 0) {
            setPuntajeDiario(0);
            return;
        }
        const suma = evaluacionesDeHoy.reduce(  // Sumamos calificaciones asegurando convertir a número (acepta negativos)
            (puntaje, e) => puntaje + Number(e.calificacion),
            0
        );

        const promedio = suma / evaluacionesDeHoy.length;

        setPuntajeDiario(promedio);
    };

    return (
        <>
            <Card border="primary" style={{ width: '11rem' }}>
                <Card.Header>Puntaje por dia</Card.Header>
                <Card.Body>
                    <Card.Title>{puntajeDiario.toFixed(2)}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PuntajeDiario;

/* <div>
            Puntaje diario: {puntajeDiario.toFixed(2)}
        </div>*/


