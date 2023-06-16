import React, { useEffect, useState } from 'react';
import useStyles from "./NewPasswordStyles";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { resetPassword } from '../../../redux/actions/userActions';
import { NEW_PASSWORD_RESET } from '../../../redux/actionTypes/userTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const NewPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { newPassword: { isLoading, isError, error, isSuccess } } = useSelector(state => state.forgotPassword)

    const { token } = useParams();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                dispatch({ type: NEW_PASSWORD_RESET });
                history.push("/login")
            }, 2000)
        }
    }, [dispatch, isError, isSuccess, history]);

    const handleSubmit = (e) => {

        e.preventDefault();
        const payload = {
            token,
            passwords: { password, confirmPassword }
        }
        dispatch(resetPassword(payload))
    }

    return (
        <div>
            <Helmet>
                <title>New Password</title>
            </Helmet>

            <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", alignItems: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <div className={classes.title}>New Password</div>
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Confirm Password"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Password updated successfully!
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

export default NewPassword