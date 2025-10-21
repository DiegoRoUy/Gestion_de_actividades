import React from 'react'

const url = "https://goalify.develotion.com/";

export const registrarUsuarioAPI = async (usu, pass, paisId) => {
    const myHeaders = new Headers();// creamos nuevo objeto de tipo Headers
    myHeaders.append("Content-Type", "application/json"); //tipo de contenido JSON


    const raw = JSON.stringify({ "usuario": usu, "password": pass, "idPais": paisId });//pasamos un objeto a un string
    const requestOption = {
        method: 'POST',
        headers: myHeaders,
        body: raw,//aca pasamos el objeto que habiamos pasado a string
        redirect: 'follow'
    };
    return fetch(`${url}usuarios.php`, requestOption)
        .then(response => {
     
            return response.text();
        })
        .then(result => {
          
            const parseo = JSON.parse(result);
            //la api devuelve el codigo en la respuesta y eventualmente
            //si hubo un error un mensaje acorde (esta api en caso de error devuelve mensaje y codigo)
            if (parseo.codigo != 200) {
                //como hubo un error, la api devuelve el objeto respuesta en un promise.reject
                //lo que implica que sera catcheado mas abajo ya que se esta diciendo que la promesa fallo
                return Promise.reject(parseo);
            } else {

                return parseo;
            }

        })
        .catch(
            //aca se puede llegar porque se lanzo un error en el segundo then o bien hubo un error que no se pudo controlar            
            (error) => {              
                //se termina lanzando un error el mensaje depende de si el error tenia un mensaje
                //se muestra el mensaje que se supone nos devolvio la api, sino se muestra el mensaje
                //hubo un error
                throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
            }

        )
}



export default registrarUsuarioAPI