import React, { useEffect, useState } from 'react'
import { useObjetivo } from '../util/useObjetivo';
import { useSelector } from 'react-redux';
import Grafica from './Grafica';

const GraficoPromedio = () => {

    const obtenerNombre = useObjetivo(); // esta constante recibe el id y retorna el nombre del objetivo
    const [datos, setDatos] = useState([]) // para guardar y mostrar el promedio por objetivo
    const [etiquetas, setEtiquetas] = useState([]); // para guardar y mostrar el nombre del objetivo
    const objetivos = useSelector((state) => state.objetivosSlices); // lista de objetivos
    const evaluaciones = useSelector((state => state.evaluacionesSlices)); // lista de evaluaciones

    useEffect(() => {
        if (objetivos.length > 0 && evaluaciones.length > 0) {
            let objetoNuevo = {};
            objetivos.forEach(o => objetoNuevo[o.id] = [0, 0]); // inicializo acumulador

            const resultado = evaluaciones.reduce(agruparObjetivos, objetoNuevo);

            const claves = Object.keys(resultado);
            const valores = Object.values(resultado);

            const promedio = valores.map(c => {
                if (c[0] > 0) {
                    return c[1] / c[0];
                }
                return 0;
            });

            const listaNombres = claves.map(c => obtenerNombre(c));
            setEtiquetas(listaNombres);
            setDatos(promedio);
        }
        else {        
            setEtiquetas([]);
            setDatos([]);
        }
    }, [objetivos, evaluaciones]);

    const agruparObjetivos = (acumulador, valorActual) => {
        acumulador[valorActual.idObjetivo][0] += 1;
        acumulador[valorActual.idObjetivo][1] += Number(valorActual.calificacion);
        return acumulador;
    }

    return (
        <div>
            <Grafica
                key={datos.join('-')}  // forzar re-render si cambian los datos
                etiquetas={etiquetas}
                datos={datos}
                nombreGrafica="Gráfica de promedio por objetivos"
                nombreDatos="Promedio Calificación"
            />
        </div>
    )
};








export default GraficoPromedio