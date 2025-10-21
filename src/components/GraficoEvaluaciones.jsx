import React, { useEffect, useState } from 'react'
import { useObjetivo } from '../util/useObjetivo'
import { useSelector } from 'react-redux';
import Grafica from './Grafica';

const GraficoEvaluaciones = () => {

    const obtenerNombre = useObjetivo(); //esta constante pasando parametro va a retornarnos el nombre del objetivo
    const [datos, setDatos] = useState([])// para guardar y mostar la cantidad de objetivos usados
    const [etiquetas, setEtiquetas] = useState([]);//para guardar y mostrar el nombre del objetivo
    const objetivos = useSelector((state) => state.objetivosSlices);//lista de objetivos
    const evaluaciones = useSelector((state => state.evaluacionesSlices));//lista de evaluaciones

    useEffect(() => {
        const resultado = evaluaciones.reduce(agruparObjetivos, {})//{} es el valor inicial del acumulador
        const clave = Object.keys(resultado);
        const valor = Object.values(resultado);
        const listaNombres = clave.map(
            c => obtenerNombre(c)
        )

        setEtiquetas(listaNombres);
        setDatos(valor)

    }, [objetivos, evaluaciones])
    const agruparObjetivos = (acumulador, valorActual) => {
        if (acumulador[valorActual.idObjetivo]) {
            acumulador[valorActual.idObjetivo] += 1;
        } else {
            acumulador[valorActual.idObjetivo] = 1;
        }
        return acumulador;
    };




    return (

        <div><Grafica etiquetas={etiquetas} datos={datos} nombreGrafica="Grafica Evaluaciones por objetivos" nombreDatos="Objetivos"></Grafica></div>
    )
}

export default GraficoEvaluaciones