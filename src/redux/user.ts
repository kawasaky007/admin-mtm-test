import { createSlice } from "@reduxjs/toolkit";
import { reducers } from ".";

const slice = createSlice({
    name: 'user',
    initialState: {
        detailUser: null,
        listUser: []
    },
    reducers: {
        uploadUser(state, actions) {
            console.log("test");

            if (state.detailUser) {
                state.detailUser = actions.payload
            }

        },
        getDetailUser(state, actions) {
            let data = [...state.listUser];


            let index = data.findIndex((item: any) => item.id === actions.payload)



            state.detailUser = data[index];




        },
        getListUser(state, actions) {


            state.listUser = actions.payload;


        }
    }
})
export const userReducer = slice.reducer;
export const userActions = slice.actions