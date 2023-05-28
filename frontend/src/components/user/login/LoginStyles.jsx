import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "35px",
        fontWeight: 600,
        textAlign: "center"
    },
    formField: {
        marginTop: '20px'
    },
    forgotPassword: {
        marginTop: '20px',
        textAlign: "end",
        color: "#949494",
        fontWeight: 600,
        fontSize: "16px",
        cursor: "pointer"
    },
    loginSpinner: {
        color: "#fff"
    },
    newUser: {
        marginTop: '20px',
        textAlign: "end",
        color: "#949494",
        fontWeight: 600,
        fontSize: "16px",
        cursor: "pointer"
    }
}));

export default useStyles;
