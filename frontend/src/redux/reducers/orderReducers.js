import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_RESET, MY_ORDERS_SUCCESS } from "../actionTypes/orderTypes";

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