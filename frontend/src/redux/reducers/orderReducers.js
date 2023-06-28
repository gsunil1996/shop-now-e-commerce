import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS } from "../actionTypes/orderTypes";

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