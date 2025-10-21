const url = "https://goalify.develotion.com/";
/* const token = localStorage.getItem("token");
const id = localStorage.getItem("idUsuario"); */

// Cargas de datos Inicio
export const obtenerPaisesAPI = async () => {
    return fetch(`${url}paises.php`)
        .then(response => response.json())
        .then(json => json);
}

export const obtenerObjetivosAPI = async (token, id) => {
    const myHeaders = new Headers();// creamos nuevo objeto de tipo Headers
    myHeaders.append("Content-Type", "application/json"); //tipo de contenido JSON
    myHeaders.append("token", token);//agregamos al header el token y el id (ya que en postamn solicita eso)
    myHeaders.append("iduser", id);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${url}objetivos.php`, requestOptions)
        .then(response => {
            return response.text();
        })
        .then(result => {
            const parseo = JSON.parse(result);
            if (parseo.codigo != 200) {
                return Promise.reject(parseo);

            } else {
                return parseo;
            }
        })
        .catch(
            (error) => {
                throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
            }
        );
}


export const obtenerEvaluacionesAPI = async (idUsu, tokenUsu) => {

    const myHeaders = new Headers();// creamos nuevo objeto de tipo Headers
    myHeaders.append("Content-Type", "application/json"); //tipo de contenido JSON
    myHeaders.append("token", tokenUsu);//agregamos al header el token y el id (ya que en postamn solicita eso)
    myHeaders.append("iduser", idUsu);
    return fetch(`${url}evaluaciones.php?idUsuario=${idUsu}`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => {

            return response.json();
        })
        .then((json) => {            
            return json
        });
}




// Cargas de datos Fin

//Metodo agregar, borrar...Inicio
export const agregarEvalucionAPI = async (nuevaEvaluacion, idusu, token) => {


    return fetch(`${url}evaluaciones.php`, {
        method: 'POST',
        body: JSON.stringify(nuevaEvaluacion),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "token": token,
            "iduser": idusu
        },
    })
        .then(response => {
            return response.json();
        })
        .then((json) => json);
}


export const eliminarEvaluacionAPI = async (idEliminar, idusu, token) => {
    return fetch(`${url}evaluaciones.php?idEvaluacion=${idEliminar}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "token": token,
            "iduser": idusu
        },

    }).then(response => response.json()).
        then(json => json);
}
//Metodo agregar, borrar...Fin