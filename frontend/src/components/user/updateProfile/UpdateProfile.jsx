import React, { useEffect, useState } from 'react';
import useStyles from "./UpdateProfileStyles";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { loadUser, updateProfileAction } from '../../../redux/actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../../redux/actionTypes/userTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UpdateProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { updateProfile: { isLoading, isError, error, isSuccess } } = useSelector(state => state.user);
    const { user: userDetails } = useSelector(state => state.auth)

    const [user, setUser] = useState({
        name: '',
        email: '',
    })

    const { name, email } = user;

    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)

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


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar || ""); // Append the avatar file

        dispatch(updateProfileAction(formData));
    }


    const handleChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    console.log("userDetails", userDetails)

    useEffect(() => {

        if (userDetails) {
            setUser(prevUser => ({
                ...prevUser,
                name: userDetails?.name,
                email: userDetails?.email
            }));
            setAvatarPreview(userDetails?.avatar?.url)
        }


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
                dispatch({ type: UPDATE_PROFILE_RESET });
            }, 2000)


            dispatch(loadUser());

            setTimeout(() => {
                history.push("/profile")
            }, 3000)
        }

    }, [dispatch, isSuccess, isError, history, userDetails])


    return (
        <div>
            <Helmet>
                <title>Update Profile</title>
            </Helmet>

            <div style={{ display: "flex", justifyContent: "center", minHeight: "90vh", alignItems: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <div className={classes.title}>Update Profile</div>
                                <form onSubmit={handleSubmit}>

                                    <div>
                                        <div className={classes.main}>
                                            <div className={classes.uploadContainer}>
                                                {avatarPreview ? (
                                                    <div>
                                                        <div className={classes.previewImage}>
                                                            <img src={avatarPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <Avatar alt="" src="" style={{ width: "100px", height: "100px" }} />
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="image-upload"
                                                type="file"
                                                name="avatar"
                                                onChange={handleChange}
                                            />

                                            <label htmlFor="image-upload">
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    style={{ background: "#FA9C23", color: "#fff", marginTop: "10px" }}
                                                >
                                                    Select Image
                                                </Button>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </div>

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
                                            onChange={handleChange}
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
                                            {isLoading ? <CircularProgress className={classes.loginSpinner} /> : "Update Profile"}
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
                    User Updated Successfully!
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

export default UpdateProfile