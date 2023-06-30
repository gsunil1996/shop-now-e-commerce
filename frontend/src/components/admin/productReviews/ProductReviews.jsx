import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useStyles from "./ProductReviewStyles";
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview, getProductReviews } from '../../../redux/actions/productActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DELETE_REVIEW_RESET } from '../../../redux/actionTypes/productTypes';

const columns = [
    {
        id: "ID",
        label: "Review ID",
        minwidth: 60,
        align: "left",
        background: "#755139FF"
    },
    {
        id: "user",
        label: "User",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "rating",
        label: "Rating",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "Comment",
        label: "Comment",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "Actions",
        label: "Actions",
        minwidth: 60,
        align: "center",
        background: "#755139FF",
    },
];


const ProductReviews = () => {
    const classes = useStyles();
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState("");

    const { data, isLoading, isError, error, isSuccess } = useSelector(state => state.getReviews);
    const { isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError, isSuccess: deleteIsSuccess } = useSelector(state => state.deleteReview);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getProductReviews(productId))
    }

    const handleDeleteClick = (e, id) => {
        setSelectedId(id)
        dispatch(deleteReview(id, productId))
    }

    useEffect(() => {
        if (deleteIsError) {
            alert(deleteError)
            dispatch({ type: DELETE_REVIEW_RESET })
        }
        if (deleteIsSuccess) {
            alert("Review deleted Successfully")
            dispatch({ type: DELETE_REVIEW_RESET })
            dispatch(getProductReviews(productId))
        }

    }, [deleteIsError, deleteError, dispatch, deleteIsSuccess, productId])


    return (
        <div>
            <Helmet>
                <title>Product Reviews</title>
            </Helmet>

            <div style={{ textAlign: "center" }} >
                <h1>Ratings and Reviews</h1>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Enter Product Id"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                            inputProps={{
                                                autoComplete: 'off',
                                                name: 'random-name-' + Math.random().toString(36).substr(2, 9), // Generate a random name attribute
                                            }}
                                        />
                                    </div>

                                    <div className={classes.formField}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size='large'
                                            // disabled={isLoading ? true : false}
                                            style={{
                                                background: "#FA9C23",
                                                color: "#fff",
                                                borderRadius: "10px",
                                            }}
                                            type="submit"
                                        >
                                            {isLoading ? <CircularProgress className={classes.loginSpinner} /> : "Submit"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <div>
                {isLoading ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                    </div>
                ) : isError ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <h4>{error}</h4>
                    </div>
                ) : isSuccess === true && data?.length == 0 ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <h1>No Reviews/Ratings Found</h1>
                    </div>
                ) : isSuccess ? (<>
                    <div style={{ width: "95%", margin: "auto", marginTop: "30px" }}>

                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    width: "100%",
                                    overflowX: "auto",
                                    display: "inline-grid",
                                    marginTop: "10px",
                                }}
                            >
                                <TableContainer component={Paper} style={{ maxHeight: 500 }} >
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            background: column.background,
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.map((row) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row._id}
                                                        style={{
                                                            background: "#F2EDD7FF"
                                                        }}
                                                    >
                                                        <TableCell align="left" >
                                                            {row._id}
                                                        </TableCell>

                                                        <TableCell align="left" style={{ maxWidth: "200px" }} >
                                                            {row.name}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row.rating}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row.comment}
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Button variant="contained" color="success"
                                                                disabled={deleteIsLoading ? true : false}
                                                                onClick={(event) =>
                                                                    handleDeleteClick(event, row._id)
                                                                }
                                                                style={{ background: "#990011FF", color: "#FCF6F5FF" }}
                                                            >
                                                                {selectedId == row._id ? <CircularProgress style={{ color: "#fff" }} /> : <DeleteForeverIcon />}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                </>) : ""}
            </div>

        </div>
    )
}

export default ProductReviews