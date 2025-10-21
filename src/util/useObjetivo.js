
import { useSelector } from "react-redux";

export const useObjetivo = () => {

    const objetivos = useSelector((state) => state.objetivosSlices);   
    const obtenerObje = (idObjetivo) => {
        const objetivoEncontrado = objetivos.find(ob => ob.id == idObjetivo);        
        return objetivoEncontrado ? objetivoEncontrado.nombre : "No se hallo";
    }
    return obtenerObje;
};
