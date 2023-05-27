import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from "../actionTypes/getProductsTypes";

// get products
const getProductsInitialState = {
    data: {},
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const getProductsReducer = (state = getProductsInitialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                data: {},
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isSuccess: true,
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        default:
            return state
    }
}