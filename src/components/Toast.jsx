import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ message, type }) => {
    useEffect(() => {
        if (message) {
            // Mostrar el toast dependiendo del tipo
            if (type === 'success') {
                toast.success(message);  // Para éxito
            } else if (type === 'error') {
                toast.error(message);    // Para error
            } else {
                toast(message);          // Para un mensaje genérico
            }
        }
    }, [message, type]); // Ejecuta cuando `message` o `type` cambian

    return null; // No renderiza nada visualmente
};

export default ToastMessage;