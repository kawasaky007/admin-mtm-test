import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'form',
    initialState: {
        show: false,
        loadData: false
    },
    reducers: {
        showForm(state) {
            state.show = true;
        },
        closeForm(state) {
            state.show = false
        },
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },

    }
})
export const formReducer = slice.reducer;
export const formActions = slice.actions