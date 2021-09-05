import { authActions, authReducers } from './auth'
import { userActions, userReducer } from './user'
import { formActions, formReducer } from './form'
import { categoryActions, categoryReducer } from './category'
import { productActions, productReducer } from './product'
import { bannerActions, bannerReducer } from './banner'
const actions = {
    authActions,
    userActions,
    formActions,
    categoryActions,
    productActions,
    bannerActions
}

const reducers = {
    authReducers,
    userReducer,
    formReducer,
    categoryReducer,
    productReducer,
    bannerReducer
}

export { actions, reducers }