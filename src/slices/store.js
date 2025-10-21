import React from 'react'
import { configureStore } from '@reduxjs/toolkit';
import registrosUsuSlices from "./feature/registrosUsuSlices";
import evaluacionesSlices from "./feature/evaluacionesSlices";
import objetivosSlices from "./feature/objetivosSlices";
import puntajesSlices from "./feature/puntajesSlices"

export const store = configureStore({
    reducer: {
        evaluacionesSlices,
        registrosUsuSlices,
        objetivosSlices,
        puntajesSlices
    }
});