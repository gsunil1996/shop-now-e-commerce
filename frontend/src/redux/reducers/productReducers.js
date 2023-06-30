import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET } from "../actionTypes/productTypes";

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

const newReviewInitialState = {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const newReviewReducer = (state = newReviewInitialState, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }

        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        case NEW_REVIEW_RESET:
            return {
                isLoading: false,
                isError: false,
                error: "",
                isSuccess: false,
            }

        default:
            return state
    }
}

// get products
const adminGetProductsInitialState = {
    data: [],
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const adminGetProductsReducer = (state = adminGetProductsInitialState, action) => {
    switch (action.type) {
        case ADMIN_PRODUCTS_REQUEST:
            return {
                ...state,
                data: [],
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isSuccess: true,
            }
        case ADMIN_PRODUCTS_FAIL:
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

const deleteProductInitialState = {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const deleteProductReducer = (state = deleteProductInitialState, action) => {
    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        case DELETE_PRODUCT_RESET:
            return {
                isLoading: false,
                isError: false,
                error: "",
                isSuccess: false,
            }

        default:
            return state
    }
}

const newProductInitialState = {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const newProductReducer = (state = newProductInitialState, action) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        case NEW_PRODUCT_RESET:
            return {
                isLoading: false,
                isError: false,
                error: "",
                isSuccess: false,
            }

        default:
            return state
    }
}