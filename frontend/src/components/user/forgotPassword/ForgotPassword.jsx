import React, { useEffect, useState } from 'react';
import useStyles from "./ForgotProductStyles";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { forgotPasswordAction } from '../../../redux/actions/userActions';
import { FORGOT_PASSWORD_RESET } from '../../../redux/actionTypes/userTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('')
    const { forgotPassword: { isLoading, isError, error, isSuccess, message } } = useSelector(state => state.forgotPassword)

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);

    const handleClickOpenFailureAlert = () => {
        setOpenFailureAlert(true)
    }

    const handleCloseFailureAlert = () => {
        setOpenFailureAlert(false)
    }

    const handleClickOpenSuccessAlert = () => {
        setOpenSuccessAlert(true);
    };

    const handleCloseSuccessAlert = () => {
        setOpenSuccessAlert(false);
    };

    useEffect(() => {

        if (isError) {
            handleClickOpenFailureAlert()
            setTimeout(() => {
                handleCloseFailureAlert()
            }, 1000)
        }

        if (isSuccess) {
            handleClickOpenSuccessAlert()

            setTimeout(() => {
                handleCloseSuccessAlert()
            }, 1000)

            setTimeout(() => {
                dispatch({ type: FORGOT_PASSWORD_RESET });
            }, 2000)
        }
    }, [dispatch, isError, isSuccess, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAction({ email }))
    }

    console.log("skjdnfljsnd", message)


    return (
        <div>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>

            <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", alignItems: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <div className={classes.title}>Forgot Password</div>
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            {isLoading ? <CircularProgress className={classes.loginSpinner} /> : "Submit"}
                                        </Button>
                                    </div>

                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success">
                    {message}
                </Alert>
            </Snackbar>

            <Snackbar open={openFailureAlert} autoHideDuration={6000} onClose={handleCloseFailureAlert}>
                <Alert onClose={handleCloseFailureAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            {console.log("Errorrrr", error)}
        </div>
    )
}

export default ForgotPassword