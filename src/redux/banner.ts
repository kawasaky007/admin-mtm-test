import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'product',
    initialState: {
        detail: null,
        listAll: []
    },
    reducers: {

        setDetail(state, actions) {
            let data = [...state.listAll];


            let index = data.findIndex((item: any) => item.id === actions.payload)



            state.detail = data[index];




        },
        getListAll(state, actions) {


            state.listAll = actions.payload;


        }
    }
})
export const bannerReducer = slice.reducer;
export const bannerActions = slice.actions