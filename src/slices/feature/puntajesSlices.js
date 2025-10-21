import { createSlice } from "@reduxjs/toolkit";
const initialState = 0
const puntajesSlices = createSlice({
    name: "puntajeGlobal",
    initialState,
    reducers: {
        puntajeGlobalSlice: (state, action) => {
            const resultado = action.payload;         
            return resultado;

        },

    }
});

export const { puntajeGlobalSlice } = puntajesSlices.actions;
export default puntajesSlices.reducer;
