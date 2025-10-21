import { createSlice } from "@reduxjs/toolkit";
const initialState = []
const objetivosSlices = createSlice({
    name: "objetivos",
    initialState,
    reducers: {
        cargaDeObjetivosSlice: (state, action) => {
            const objetivos = action.payload;
            return objetivos;

        },

    }
});

export const { cargaDeObjetivosSlice } = objetivosSlices.actions;
export default objetivosSlices.reducer;