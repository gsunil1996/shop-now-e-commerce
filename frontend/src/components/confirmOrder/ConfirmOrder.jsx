import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomizedSteppers from '../stepper/CustomizedSteppers';
import { Helmet } from 'react-helmet';
import useStyles from "./ConfirmOrderStyles";
import { useHistory } from 'react-router-dom';
import { getCartAction } from '../../redux/actions/cartActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom'

const ConfirmOrder = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { getCart: { isLoading, isError, error, isSuccess, cartItems }, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);
    // console.log("cartItems", cartItems)
    const history = useHistory();

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

    useEffect(() => {
        if (user?._id) {
            dispatch(getCartAction({ userId: user?._id }))
        }
    }, [dispatch, user?._id])

    return (
        <div style={{ paddingBottom: "50px" }} >
            <Helmet>
                <title>Shipping Info</title>
            </Helmet>

            <CustomizedSteppers step={1} />

            <div>

                <div>

                    {isLoading ? (<div style={{ width: "100%", marginTop: "50px" }} > <LinearProgress />  </div>) :
                        isError ? (<div style={{ textAlign: "center", marginTop: "50px" }}>
                            <h1>{error}</h1>
                        </div>) : isSuccess ? (
                            <div style={{ width: "90%", margin: "auto", marginTop: "10px", paddingBottom: "50px" }} >
                                <Grid container justifyContent='space-between'>
                                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                                        <h4>Shipping Info</h4>
                                        <p><b>Name:</b> {shippingInfo.name}</p>
                                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                                        <p><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`}</p>

                                        <hr />
                                        <div>
                                            <h2>
                                                Your Cart: <span style={{ color: "#FA9C23" }} > {cartItems?.cart?.items?.length} items
                                                </span>
                                            </h2>
                                            {cartItems?.cart?.items?.map(item =>

                                                <Card Card style={{ marginBottom: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                                                    {console.log("ksjdbfodspi", item?.productId?.name)}
                                                    <CardContent>
                                                        <div className={classes.cardContainer} >
                                                            <Link to={`/product/${item?.productId?._id}`}>
                                                                <div>
                                                                    <img src={item?.productId?.images[0]?.url} alt="" style={{ maxWidth: "200px", maxHeight: "150px" }} />
                                                                </div>
                                                            </Link>


                                                            <div className={classes.text} >
                                                                <Link to={`/product/${item?.productId?._id}`} style={{ textDecoration: "none", color: "#000" }} >
                                                                    {item?.productId?.name}
                                                                </Link>
                                                            </div>


                                                            <div>
                                                                <h2 style={{ color: "#FA9C23" }}> {item?.productId?.price}</h2>
                                                            </div>

                                                            <div className={classes.productMain} >
                                                                <div>
                                                                    <div className={classes.productCount}> Quantity: {item?.quantity}</div>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                        <div>
                                            <h2>
                                                Price Details
                                            </h2>
                                            <div>
                                                <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", background: "#F2EDD7FF", color: "#755139FF" }}>
                                                    <CardContent>
                                                        <div style={{ textAlign: "center" }} >
                                                            <h3>Total Items: {cartItems?.totalItems}</h3>
                                                            <hr />

                                                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                                <h4 style={{ marginBottom: "0px" }} >Items Price:</h4>
                                                                <h4 style={{ marginBottom: "0px" }}>{cartItems?.totalPrice}</h4>
                                                            </div>

                                                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                                <h4 style={{ marginBottom: "0px" }} >Shipping Price:</h4>
                                                                <h4 style={{ marginBottom: "0px" }}>{shippingPrice}</h4>
                                                            </div>

                                                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                                <h4 style={{ marginBottom: "0px" }} >Tax:</h4>
                                                                <h4 style={{ marginBottom: "0px" }}>{taxPrice}</h4>
                                                            </div>


                                                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", borderTopStyle: 'dotted', marginTop: "10px" }} >
                                                                <h4>Total Amount:</h4>
                                                                <h4>{totalPrice}</h4>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Button
                                        variant="contained"
                                        size='large'
                                        style={{ background: "#FA9C23", color: "#fff", marginTop: "30px" }}
                                        onClick={() => history.push("/payment")}
                                    >
                                        Proceed to Payment
                                    </Button>
                                </div>
                            </div>
                        ) : (<div style={{ textAlign: "center" }} > <h1>No Products Found</h1> </div>)
                    }
                </div >
            </div>


        </div>
    )
}

export default ConfirmOrder