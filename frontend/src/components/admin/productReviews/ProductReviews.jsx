import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useStyles from "./ProductReviewStyles";


const ProductReviews = () => {
    let reviewIsLoading = false;
    const classes = useStyles();
    const [id, setId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
    }

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
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
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
                                            {reviewIsLoading ? <CircularProgress className={classes.loginSpinner} /> : "Submit"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProductReviews