import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';
const Logout = () => {

    const navigate = useNavigate()
    /*   useEffect(() => {
          let localStorage = window.localStorage;
          const id = localStorage.getItem("idUsuario");
          const token = localStorage.getItem("token");
          if (!id && !token) {
              //alert("logueado")// xq entra a este alert constantemente si no hubo cambios luego del logueo?
              navigate("/menu");
          }
      }, []); */

    const handleCerrarSesion = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (

        <div className="d-flex gap-2">

            <Button
                variant="primary"
                size="md"
                className="rounded-pill d-flex align-items-center gap-2"
                onClick={handleCerrarSesion}
            >
                <i className="bi bi-box-arrow-right"></i> 
                Cerrar Sesión
            </Button>
        </div>

    )
}

export default Logout