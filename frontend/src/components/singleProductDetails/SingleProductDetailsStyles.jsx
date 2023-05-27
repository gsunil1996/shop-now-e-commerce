import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: "50px",
        width: "90%",
        margin: "auto",
        marginTop: "40px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    loadingContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    loadingBar: {
        width: "100%",
        marginTop: "20px",
    },
    errorContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    noProductContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        [theme.breakpoints.down("sm")]: {
            minHeight: "20vh",
        },
    },
    image: {
        maxWidth: "60%",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "80%",
            margin: "auto"
        },
    },
    productName: {
        fontSize: "30px",
        fontWeight: 500,
        color: "#232F3E",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    ratingContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    reviewCount: {
        fontWeight: 600,
        color: "#4178bb",
    },
    price: {
        marginTop: "20px",
        fontWeight: 600,
        fontSize: "30px",
        color: "#FA9C23",
        textAlign: "center",
    },
    productCountContainer: {
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    productCount: {
        fontSize: "18px",
        fontWeight: 700,
    },
    addToCartContainer: {
        marginTop: "20px",
        textAlign: "center",
    },
    addToCartButton: {
        background: "#FA9C23",
        color: "#fff",
        borderRadius: "20px",
    },
    stockStatus: {
        marginTop: "20px",
        fontWeight: 500,
        fontSize: "20px",
        textAlign: "center",
    },
    inStock: {
        color: "#528600",
    },
    outOfStock: {
        color: "#E11821",
    },
    descriptionContainer: {
        marginTop: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            margin: "auto",
            textAlign: "center"
        },
    },
    descriptionTitle: {
        fontSize: "25px",
        fontWeight: 600,
    },
    loginAlert: {
        marginTop: "20px",
    },
    reviewsContainer: {
        width: "80%",
        margin: "auto",
        marginTop: "20px",
    },
    reviewsTitle: {
        fontSize: "30px",
        fontWeight: 600,
        color: "#0c4288",
        textAlign: "center",
    },
    reviewsContent: {
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
    },
    reviewName: {
        fontWeight: 500,
        color: "#8D8D8D",
        textAlign: "center",
    },
    reviewComment: {
        fontWeight: 500,
        textAlign: "center",
    },
    reviewRating: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default useStyles;
