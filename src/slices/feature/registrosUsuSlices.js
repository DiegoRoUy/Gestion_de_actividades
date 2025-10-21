import { createSlice } from "@reduxjs/toolkit";
const initialState = []
const registrosUsuSlices = createSlice({
    name: "paises",
    initialState,
    reducers: {
        cargaDePaisesSlice: (state, action) => {
            const paisesCargados = action.payload;           
            return paisesCargados;
        }
    }
});

export const { cargaDePaisesSlice } = registrosUsuSlices.actions;
export default registrosUsuSlices.reducer;