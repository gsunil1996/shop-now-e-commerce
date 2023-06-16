import React, { useEffect, useState } from 'react';
import useStyles from "./UpdatePasswordStyles";
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
import { updatePasswordAction } from '../../../redux/actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../../redux/actionTypes/userTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const UpdatePassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { updatePassword: { isLoading, isError, error, isSuccess } } = useSelector(state => state.user);

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

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
                dispatch({ type: UPDATE_PASSWORD_RESET });
            }, 2000)

            setTimeout(() => {
                history.push('/profile')
            }, 3000)
        }
    }, [dispatch, isError, isSuccess, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({ oldPassword, password }))
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", alignItems: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <div className={classes.title}>Update Password</div>
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Old Password"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            name="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="New Password"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                            {isLoading ? <CircularProgress className={classes.loginSpinner} /> : "Login"}
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
                    User Login Successfully!
                </Alert>
            </Snackbar>

            <Snackbar open={openFailureAlert} autoHideDuration={6000} onClose={handleCloseFailureAlert}>
                <Alert onClose={handleCloseFailureAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UpdatePassword