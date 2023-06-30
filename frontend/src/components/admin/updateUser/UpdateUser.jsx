import React, { useEffect, useState } from 'react';
import useStyles from "./UpdateUserStyles";
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from "react-router-dom";
import { getUserDetails, updateUser } from '../../../redux/actions/userActions';
import { useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../../redux/actionTypes/userTypes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const { getSingleUserDetails: { data, isLoading, isError, error, isSuccess }, updateUser: { isLoading: updateIsLoading, isError: updateIsError, error: updateError, isSuccess: updateIsSuccess } } = useSelector(state => state.user);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {

        dispatch(getUserDetails(id))

        if (updateIsError) {
            alert(updateError)
            dispatch({ type: UPDATE_USER_RESET })
        }

        if (updateIsSuccess) {
            alert('User updated successfully');
            dispatch({ type: UPDATE_USER_RESET })
            history.push('/admin/users')
        }

    }, [updateIsError, updateIsSuccess, dispatch, updateError, id, history])

    useEffect(() => {
        setName(data?.name)
        setEmail(data?.email)
        setRole(data?.role)
    }, [data])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, { name, email, role }))
    }


    return (
        <div>
            <Helmet>
                <title>Update User</title>
            </Helmet>

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
                    <h1>No Orders Found</h1>
                </div>
            ) : isSuccess ? (<>

                <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", alignItems: "center" }} >
                    <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                        <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                                <CardContent>
                                    <div className={classes.title}>Update User</div>
                                    <form onSubmit={handleSubmit}>

                                        <div className={classes.formField}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
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
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Role"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                required
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>

                                        <div className={classes.formField}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size='large'
                                                disabled={updateIsLoading ? true : false}
                                                style={{
                                                    background: "#FA9C23",
                                                    color: "#fff",
                                                    borderRadius: "10px",
                                                }}
                                                type="submit"
                                            >
                                                {updateIsLoading ? <CircularProgress className={classes.loginSpinner} /> : "Submit"}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </>) : ""}
        </div>
    )
}

export default UpdateUser