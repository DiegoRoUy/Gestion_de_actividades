import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import CircularIndeterminate from './CircularIndeterminate';
import AgregarEvaluacion from './AgregarEvaluacion'
import Evaluaciones from './Evaluaciones'
import { useDispatch } from 'react-redux';
import { cargaEvaluacionesSlice } from '../slices/feature/evaluacionesSlices';
import { obtenerEvaluacionesAPI, obtenerObjetivosAPI } from '../services/servicios';
import { toast, ToastContainer } from 'react-toastify';
import Logout from './Logout';
import { cargaDeObjetivosSlice } from '../slices/feature/objetivosSlices';
import PuntajeDiario from './PuntajeDiario';
import PuntajeGlobal from './PuntajeGlobal';
import SituacionPersonal from './SituacionPersonal';
import GraficoEvaluaciones from './GraficoEvaluaciones';
import GraficoPromedio from './GraficoPromedio';


const Dashboard = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logueado, setLogueado] = useState(false)


    useEffect(() => {
        const init = async () => {
            objetivosLista();
            loadData();           
            await cargarEvaluaciones();
        };

        init();
    }, [])

    //let localStorage = window.localStorage;
    const id = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("token");
    const loadData = async () => {
        // Sleep function to delay execution
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(2000); // espera 2 segundos    
        if (!id || !token) {
            navigate("/login");
        } else {
            setLogueado(true);
        }
    };


    const objetivosLista = async () => {
        const resultadoObjetivos = await obtenerObjetivosAPI(token, id);
        dispatch(cargaDeObjetivosSlice(resultadoObjetivos.objetivos))

    };

    const cargarEvaluaciones = async () => {
        try {

            const resultado = await obtenerEvaluacionesAPI(id, token);
            dispatch(cargaEvaluacionesSlice(resultado.evaluaciones));
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <>

            <div className="menu-container">

                <header className="d-flex justify-content-between align-items-center px-4"
                    style={{
                        backgroundColor: '#1877f2',
                        height: '400px',
                        color: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1030,
                    }}>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '800', margin: 0, cursor: 'pointer' }}>
                        Sistema de evaluación
                    </h1>
                    <Logout />
                </header>
                <main>
                    <div className='row d-flex justify-content-center'>
                        <section className="col-12 col-md-5 bg-white border rounded shadow-sm mt-4 me-3">
                            <AgregarEvaluacion />
                        </section>

                        <section className="col-12 col-md-5 bg-white border rounded shadow-sm mt-4">
                            <Evaluaciones />

                        </section>


                        <section className="col-12 d-flex justify-content-center mt-4" style={{ display: 'flex', gap: '1rem' }} >
                            <PuntajeDiario></PuntajeDiario>
                            <PuntajeGlobal></PuntajeGlobal>
                            <SituacionPersonal></SituacionPersonal>
                        </section>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <section className="col-12 col-md-4 bg-white border rounded shadow-sm mt-4 me-2"><GraficoEvaluaciones></GraficoEvaluaciones></section>
                        <section className="col-12 col-md-4 bg-white border rounded shadow-sm mt-4 ">
                            <GraficoPromedio></GraficoPromedio>
                        </section>
                        {/*  {logueado ? <Outlet></Outlet> : <CircularIndeterminate />} */}
                    </div>
                </main >
                <ToastContainer />
            </div >
        </>
    )
}

export default Dashboard