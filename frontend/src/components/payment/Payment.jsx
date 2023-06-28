import React, { useEffect, useState } from 'react';
import useStyles from "./PaymentStyles";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Helmet } from 'react-helmet';
import CustomizedSteppers from '../stepper/CustomizedSteppers';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { createOrder } from '../../redux/actions/orderActions';
import { deleteAllCartItem } from '../../redux/actions/cartActions';
import { REMOVE_ALL_CART_PRODUCTS_RESET } from '../../redux/actionTypes/cartTypes';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const { getCart: { cartItems }, shippingInfo, emptyCart: { isLoading, isError, error, isSuccess } } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);
    const { isLoading: newOrderLoading, isError: newOrderIsError, error: newOrderError, isSuccess: newOrderIsSuccess } = useSelector(state => state.newOrder)


    useEffect(() => {
        if (newOrderIsSuccess) {
            dispatch(deleteAllCartItem({ userId: user?._id }))

            if (isSuccess) {
                dispatch({ type: REMOVE_ALL_CART_PRODUCTS_RESET });
                history.push('/success')
            }
        }
    }, [dispatch, newOrderIsSuccess, isSuccess, history, user])

    const [shippingPrice, setShippingPrice] = useState("");
    const [taxPrice, setTaxPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setShippingPrice(cartItems?.totalPrice == 0 ? 0 : cartItems?.totalPrice > 500 ? 0 : 100)
        setTaxPrice(Number((0.05 * cartItems?.totalPrice).toFixed(2)))

    }, [cartItems])

    useEffect(() => {
        setTotalPrice(Number(cartItems?.totalPrice) + Number(shippingPrice) + Number(taxPrice))
    }, [cartItems, shippingPrice, taxPrice])


    const paymentData = {
        amount: Math.round(totalPrice * 100)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/payment/process', paymentData, { withCredentials: true })
            const clientSecret = data.client_secret;

            console.log("clientSecret", clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert(result.error.message);
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    const payload = {
                        itemsPrice: cartItems?.totalPrice,
                        taxPrice: taxPrice,
                        shippingPrice: shippingPrice,
                        totalPrice: totalPrice,
                        orderItems: cartItems?.cart?.items,
                        shippingInfo,
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        }
                    }

                    dispatch(createOrder(payload))
                } else {
                    alert('There is some issue while payment processing')
                }
            }

        } catch (error) {
            alert(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }

    }

    const options = {
        style: {
            base: {
                fontSize: '16px'
            },
            invalid: {
                color: '#9e2146'
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title>Payment</title>
            </Helmet>

            <CustomizedSteppers step={2} />

            <div style={{ width: "100%" }} >
                <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", background: "#F2EDD7FF", color: "#755139FF", maxWidth: "max-content", margin: "auto", marginBottom: "30px" }}>
                    <CardContent>
                        <div style={{ textAlign: "center" }} >
                            <h3>For testing purpose enter the details as below</h3>
                            <hr />
                            <p><b>Card Number:</b> 4000 0035 6000 0008</p>
                            <p><b>Card Expiry:</b> Any future Month / Year: <b>eg: 12/34</b></p>
                            <p><b>Card CVV:</b> Any three numbers: <b>eg: 111</b></p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ paddingBottom: "50px" }} >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                        <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                                <CardContent>
                                    <div className={classes.title}>Card Info</div>
                                    <form onSubmit={handleSubmit}>
                                        <div className={classes.formField}>
                                            <TextField
                                                label="Card Number"
                                                variant="outlined"
                                                fullWidth
                                                id="card_num_field"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputComponent: CardNumberElement,
                                                    inputProps: {
                                                        options: options,
                                                    },
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <TextField
                                                label="Card Expiry"
                                                variant="outlined"
                                                fullWidth
                                                id="card_exp_field"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputComponent: CardExpiryElement,
                                                    inputProps: {
                                                        options: options,
                                                    },
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <TextField
                                                label="Card CVC"
                                                variant="outlined"
                                                fullWidth
                                                id="card_cvc_field"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputComponent: CardCvcElement,
                                                    inputProps: {
                                                        options: options,
                                                    },
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size='large'
                                                disabled={loading ? true : false}
                                                style={{
                                                    background: "#FA9C23",
                                                    color: "#fff",
                                                    borderRadius: "10px",
                                                }}
                                                type="submit"
                                            >
                                                {loading ? <CircularProgress className={classes.loginSpinner} /> :
                                                    `Pay - ${totalPrice}`}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Payment;
