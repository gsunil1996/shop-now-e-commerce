import React, { useEffect, useState } from 'react';
import useStyles from "./SingleProductDetailsStyles";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import { CircularProgress, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getSingleProductAction } from '../../redux/actions/productActions';
import { Helmet } from 'react-helmet';
import { addToCartAction, getCartAction } from '../../redux/actions/cartActions';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { ADD_TO_CART_RESET } from '../../redux/actionTypes/cartTypes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SingleProductDetails = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data, isLoading, isError, error, isSuccess } = useSelector((state) => state.getSingleProductDetails);

    const { addToCart: { isLoading: isAddToCartLoading, isError: isAddToCartError, error: addToCartError, isSuccess: isAddToCartSuccess } } = useSelector((state) => state.cart);

    const { user } = useSelector(state => state.auth);


    const [productCount, setProductCount] = useState(1);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const increaseQty = () => {

        if (productCount >= data?.product?.stock) {
            return
        } else {
            setProductCount(productCount + 1)
        }
    }

    const decreaseQty = () => {

        if (productCount <= 1) {
            return;
        } else {
            setProductCount(productCount - 1)
        }
    }

    const handleAddToCart = () => {
        const payload = {
            userId: user?._id,
            products: [
                { "productId": id, "quantity": productCount },
            ]
        }
        dispatch(addToCartAction(payload))
    }

    useEffect(() => {
        dispatch(getSingleProductAction({ id }))
    }, [])

    useEffect(() => {
        if (isAddToCartSuccess || isAddToCartError) {
            handleClickOpen();
            setTimeout(() => {
                handleClose()
            }, 2000)

            setTimeout(() => {
                dispatch({ type: ADD_TO_CART_RESET });
            }, 3000)

        }
        if (isAddToCartSuccess) {
            dispatch(getCartAction({ userId: user?._id }))
        }
    }, [isAddToCartSuccess, isAddToCartError, dispatch, user?._id])

    return (
        <>
            <div className={classes.container}>
                <Helmet>
                    <title>{data?.product?.name}</title>
                </Helmet>
                {isLoading ? (
                    <div className={classes.loadingContainer}>
                        <LinearProgress className={classes.loadingBar} />
                    </div>
                ) : isError ? (
                    <div className={classes.errorContainer}>
                        <h4>{error}</h4>
                    </div>
                ) : isSuccess === true && data?.products?.length === 0 ? (
                    <div className={classes.noProductContainer}>
                        <h1>No Product Found</h1>
                    </div>
                ) : isSuccess ? (
                    <>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.imageContainer}>
                                <img src={data?.product?.images[0]?.url} alt="" className={classes.image} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div>
                                    <div>
                                        <div className={classes.productName}>{data?.product?.name}</div>
                                    </div>
                                    <div className={classes.ratingContainer}>
                                        <Rating name="read-only" value={Number(data?.product?.ratings)} precision={0.1} readOnly />
                                        <div className={classes.reviewCount}>{data?.product?.reviews?.length} reviews</div>
                                    </div>
                                    <div className={classes.price}>{`Price: ${data?.product?.price}`}</div>
                                    <div>
                                        <div className={classes.productCountContainer}>
                                            <Button variant="contained" color="secondary" size='small'
                                                onClick={decreaseQty} >-</Button>
                                            <div className={classes.productCount}>{productCount}</div>
                                            <Button variant="contained" color="primary" size='small'
                                                onClick={increaseQty} >+</Button>

                                        </div>
                                    </div>
                                    <div className={classes.addToCartContainer}>
                                        {data?.product?.stock == 0 ?
                                            <Button variant="contained" size='large' disabled >
                                                Add to cart
                                            </Button> :
                                            <Button variant="contained" size='large'
                                                style={{
                                                    background: "#FA9C23",
                                                    color: "#fff",
                                                    borderRadius: "20px",
                                                }}
                                                onClick={handleAddToCart}
                                            >
                                                {isAddToCartLoading ? <CircularProgress style={{ color: "#fff" }} /> : "Add to cart"}
                                            </Button>
                                        }
                                    </div>
                                    <div className={classes.stockStatus}>
                                        {data?.product?.stock > 0 ? (
                                            <span className={classes.inStock}>In Stock - {data?.product?.stock}</span>
                                        ) : (
                                            <span className={classes.outOfStock}>Out of Stock</span>
                                        )}
                                    </div>
                                    <div className={classes.descriptionContainer}>
                                        <div className={classes.descriptionTitle}>Description:</div>
                                        <div>{data?.product?.description}</div>
                                    </div>
                                    <div className={classes.loginAlert}>
                                        <Alert severity="error">
                                            <AlertTitle>Login to post your review.</AlertTitle>
                                        </Alert>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        {data?.product?.reviews.length > 0 && (
                            <div className={classes.reviewsContainer}>
                                <div className={classes.reviewsTitle}>Other's Reviews:</div>
                                <hr />
                                <div className={classes.reviewsContent} >
                                    <div>
                                        {data?.product?.reviews.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <div className={classes.reviewRating} >
                                                    <Rating name="read-only" value={Number(item.rating)} precision={0.1} readOnly />
                                                </div>
                                                <div className={classes.reviewName}>{`by: ${item.name}`}</div>
                                                <div className={classes.reviewComment}>{item.comment}</div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )}
                    </>
                ) : null}

            </div>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="max-width-dialog-title"
            >
                {isAddToCartSuccess ? (<div>
                    <Alert severity="success">
                        <AlertTitle>Item Added to Cart Successfully!</AlertTitle>
                    </Alert></div>) : isAddToCartError ? (<div>
                        <Alert severity="error">
                            <AlertTitle>{addToCartError}</AlertTitle>
                        </Alert></div>) : ""}
            </Dialog>
        </>
    );
}

export default SingleProductDetails;
