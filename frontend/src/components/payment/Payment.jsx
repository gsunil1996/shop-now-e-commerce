import React from 'react'
import { useSelector } from 'react-redux';

const Payment = () => {

    const { getCart: { isLoading, isError, error, isSuccess, cartItems }, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);

    return (
        <div>Payment</div>
    )
}

export default Payment