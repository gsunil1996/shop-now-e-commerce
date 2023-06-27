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

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { getCart: { isLoading, isError, error, isSuccess, cartItems }, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);

    const [shippingPrice, setShippingPrice] = useState("");
    const [taxPrice, setTaxPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        setShippingPrice(cartItems?.totalPrice == 0 ? 0 : cartItems?.totalPrice > 500 ? 0 : 100)
        setTaxPrice(Number((0.05 * cartItems?.totalPrice).toFixed(2)))

    }, [cartItems])

    useEffect(() => {
        setTotalPrice(Number(cartItems?.totalPrice) + Number(shippingPrice) + Number(taxPrice))
    }, [cartItems, shippingPrice, taxPrice])

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Submitted")
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

            <div>
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
                                                required // Added required attribute
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
                                                required // Added required attribute
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
                                                required // Added required attribute
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size='large'
                                                disabled={isLoading ? true : false}
                                                style={{
                                                    background: "#FA9C23",
                                                    color: "#fff",
                                                    borderRadius: "10px",
                                                }}
                                                type="submit"
                                            >
                                                {isLoading ? <CircularProgress className={classes.loginSpinner} /> :
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
