import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE } from "../actionTypes/productTypes";

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


// get single product
const getSingleProductInitialState = {
    data: {},
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const getSingleProductDetailsReducer = (state = getSingleProductInitialState, action) => {
    switch (action.type) {
        case GET_SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                data: {},
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isSuccess: true,
            }
        case GET_SINGLE_PRODUCT_FAILURE:
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