import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'product',
    initialState: {
        detail: null,
        listAll: [],
        listProductSale: [],
        detailProductSale: null
    },
    reducers: {

        setDetail(state, actions) {
            let data = [...state.listAll];
            let index = data.findIndex((item: any) => item.id === actions.payload)
            state.detail = data[index];
        },
        getListAll(state, actions) {
            state.listAll = actions.payload;
        },
        // sales
        setDetailSales(state, actions) {
            let data = [...state.listProductSale];
            let index = data.findIndex((item: any) => item.id === actions.payload)
            state.detailProductSale = data[index];
            console.log(index);

        },
        getListProductSale(state, actions) {
            state.listProductSale = actions.payload;

        }

    }
})
export const productReducer = slice.reducer;
export const productActions = slice.actions