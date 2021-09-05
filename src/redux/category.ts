import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'category',
    initialState: {
        detail: null,
        listAll: []
    },
    reducers: {

        getDetail(state, actions) {
            let data = [...state.listAll];


            let index = data.findIndex((item: any) => item.id === actions.payload)



            state.detail = data[index];




        },
        getListAll(state, actions) {


            state.listAll = actions.payload;


        }
    }
})
export const categoryReducer = slice.reducer;
export const categoryActions = slice.actions