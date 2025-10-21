

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const evaluacionesSlices = createSlice({
    name: "evaluaciones",
    initialState,
    reducers: {
        // Agregar una nueva evaluación al estado
        agregarEvaluacionesSlice: (state, action) => {
            const nuevaEvaluacion = action.payload;
            return [...state, nuevaEvaluacion]
            //state.push(nuevaEvaluacion);
        },

        // Cargar todas las evaluaciones (reemplaza el array actual)
        cargaEvaluacionesSlice: (state, action) => {
            
            return action.payload; // Reemplaza todo el array
        },

        // Eliminar una evaluación por ID
        eliminarEvaluacionesSlices: (state, action) => {
            const evaluacionId = action.payload;

            return state.filter(e => e.id !== evaluacionId); // Devuelve el array filtrado directamente
        }
    }
});

export const {
    agregarEvaluacionesSlice,
    cargaEvaluacionesSlice,
    eliminarEvaluacionesSlices
} = evaluacionesSlices.actions;

export default evaluacionesSlices.reducer;
