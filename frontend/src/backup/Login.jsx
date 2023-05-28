import React, { useEffect, useState } from 'react'
import useStyles from "./LoginStyles";
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../redux/actions/userActions';
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
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValues = {
    email: '',
    password: '',
};

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoading, isError, error, isSuccess, isAuthenticated } = useSelector(state => state.auth);


    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailueAlert] = useState(false);

    const handleClickOpenFailureAlert = () => {
        setOpenFailueAlert(true)
    }

    const handleCloseFailureAlert = () => {
        setOpenFailueAlert(false)
    }

    const handleClickOpenSuccessAlert = () => {
        setOpenSuccessAlert(true);
    };

    const handleCloseSuccessAlert = () => {
        setOpenSuccessAlert(false);
    };

    useEffect(() => {

        if (isAuthenticated) {
            history.push("/")
        }

        if (isError) {
            handleClickOpenFailureAlert()
        }

        if (isSuccess) {
            handleClickOpenSuccessAlert()
        }

    }, [dispatch, isAuthenticated, isError, isSuccess, history])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formValues", formValues)
        dispatch(loginAction(formValues))
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
                                <div style={{ fontSize: "35px", fontWeight: 600, textAlign: "center" }} >Login</div>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginTop: '20px' }}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            required
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <FormControl variant="outlined" fullWidth required>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formValues.password}
                                                onChange={handleChange}
                                                name="password"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                    </div>

                                    <div style={{ marginTop: '20px', textAlign: "end", color: "#949494", fontWeight: 600, fontSize: "16px", cursor: "pointer" }} onClick={() => history.push("/password/forgot")} >
                                        Forgot Password?
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
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
                                            type="submit">

                                            {isLoading ? <CircularProgress style={{ color: "#fff" }} /> : "Login"}

                                        </Button>
                                    </div>

                                    <div style={{ marginTop: '20px', textAlign: "end", color: "#949494", fontWeight: 600, fontSize: "16px", cursor: "pointer" }} onClick={() => history.push("/register")} >
                                        New User?
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success">
                    user Login Sucessfully!
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

export default Login