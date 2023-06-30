import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_RESET, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../actionTypes/orderTypes";

const newOrderInitialState = {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    order: []
}

export const newOrderReducer = (state = newOrderInitialState, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null,
                isSuccess: false,
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }
        case CREATE_ORDER_RESET:
            return {
                isLoading: false,
                isError: false,
                error: null,
                isSuccess: false,
                order: []
            }

        default:
            return state;
    }
}

const myOrderInitialState = {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    data: []
}

export const myOrdersReducer = (state = myOrderInitialState, action) => {
    switch (action.type) {

        case MY_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null,
                isSuccess: false,
            }

        case MY_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }

        case MY_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }
        case MY_ORDERS_RESET:
            return {
                isLoading: false,
                isError: false,
                error: null,
                isSuccess: false,
                data: []
            }

        default:
            return state;
    }
}

const orderDetailsInitialState = {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    order: {}
}


export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null,
                isSuccess: false,
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }
        case ORDER_DETAILS_RESET:
            return {
                isLoading: false,
                isError: false,
                error: null,
                isSuccess: false,
                order: {}
            }

        default:
            return state;
    }
}

const allOrdersInitialState = {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    data: {}
}


export const allOrdersReducer = (state = allOrdersInitialState, action) => {
    switch (action.type) {

        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null,
                isSuccess: false,
            }

        case ALL_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }

        case ALL_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        default:
            return state;
    }
}

const updateOrderInitialState = {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const updateOrderReducer = (state = updateOrderInitialState, action) => {
    switch (action.type) {

        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }

        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        case UPDATE_ORDER_RESET:
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

const deleteOrderInitialState = {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
}

export const deleteOrderReducer = (state = deleteOrderInitialState, action) => {
    switch (action.type) {

        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: "",
                isSuccess: false,
            }

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }

        case DELETE_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            }

        case DELETE_ORDER_RESET:
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