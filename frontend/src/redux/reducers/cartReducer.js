import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_RESET,
    ADD_TO_CART_SUCCESS,
    DECREASE_CART_ITEM_FAILURE,
    DECREASE_CART_ITEM_REQUEST,
    DECREASE_CART_ITEM_RESET,
    DECREASE_CART_ITEM_SUCCESS,
    GET_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_RESET,
    GET_CART_SUCCESS,
    INCREASE_CART_ITEM_FAILURE,
    INCREASE_CART_ITEM_REQUEST,
    INCREASE_CART_ITEM_RESET,
    INCREASE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_RESET,
    REMOVE_CART_ITEM_SUCCESS,
    SAVE_SHIPPING_INFO,
} from '../actionTypes/cartTypes';

const initialState = {
    getCart: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        cartItems: null,
    },
    addToCart: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        addedItems: null
    },
    removeItemFromCart: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    increaseQuantity: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    decreaseQuantity: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
            return {
                ...state,
                getCart: {
                    ...state.getCart,
                    cartItems: null,
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case GET_CART_SUCCESS:
            return {
                ...state,
                getCart: {
                    ...state.getCart,
                    cartItems: action.payload,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case GET_CART_FAILURE:
            return {
                ...state,
                getCart: {
                    ...state.getCart,
                    cartItems: null,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case GET_CART_RESET:
            return {
                ...state,
                getCart: {
                    cartItems: null,
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                addToCart: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addToCart: {
                    ...state.addToCart,
                    addedItems: action.payload,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case ADD_TO_CART_FAILURE:
            return {
                ...state,
                addToCart: {
                    ...state.addToCart,
                    addedItems: null,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case ADD_TO_CART_RESET:
            return {
                ...state,
                addToCart: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    addedItems: null
                }
            }

        case REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                removeItemFromCart: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                removeItemFromCart: {
                    ...state.removeItemFromCart,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                removeItemFromCart: {
                    ...state.removeItemFromCart,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case REMOVE_CART_ITEM_RESET:
            return {
                ...state,
                removeItemFromCart: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case INCREASE_CART_ITEM_REQUEST:
            return {
                ...state,
                increaseQuantity: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case INCREASE_CART_ITEM_SUCCESS:
            return {
                ...state,
                increaseQuantity: {
                    ...state.increaseQuantity,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case INCREASE_CART_ITEM_FAILURE:
            return {
                ...state,
                increaseQuantity: {
                    ...state.increaseQuantity,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case INCREASE_CART_ITEM_RESET:
            return {
                ...state,
                increaseQuantity: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case DECREASE_CART_ITEM_REQUEST:
            return {
                ...state,
                decreaseQuantity: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case DECREASE_CART_ITEM_SUCCESS:
            return {
                ...state,
                decreaseQuantity: {
                    ...state.decreaseQuantity,
                    isLoading: false,
                    isSuccess: false,
                }
            }

        case DECREASE_CART_ITEM_FAILURE:
            return {
                ...state,
                decreaseQuantity: {
                    ...state.decreaseQuantity,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case DECREASE_CART_ITEM_RESET:
            return {
                ...state,
                decreaseQuantity: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state;
    }
};
