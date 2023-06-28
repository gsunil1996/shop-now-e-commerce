import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    productCountContainer: {
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        justifyContent: "flex-start",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    productCount: {
        fontSize: "18px",
        fontWeight: 700,
        display: "flex",
        justifyContent: "center"
    },
    text: {
        maxWidth: "20%",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
        },
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "10px",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    productMain: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },

    }
}));

export default useStyles;
