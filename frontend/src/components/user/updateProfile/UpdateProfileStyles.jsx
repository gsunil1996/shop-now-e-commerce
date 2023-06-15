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
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    uploadContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    },
    previewImage: {
        objectFit: 'cover', // Adjust the image aspect ratio
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            width: "200px",
            height: "200px",
        },
    },
    input: {
        display: 'none',
    },
}));

export default useStyles;