import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "95%",
        margin: "auto",
    },
    filters: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "20px",
    },
    filterItem: {
        flex: "1 1 250px",
    },
    filterField: {
        width: "100%",
    },
    filterSelect: {
        height: "45px",
    },
    productList: {
        paddingBottom: "50px",
    },
    loading: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    progressBar: {
        width: "100%",
        marginTop: "20px",
    },
    error: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    noProducts: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    },
    cards: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    card: {
        width: "250px",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        marginTop: "20px",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
    },
    image: {
        maxWidth: "100%",
        maxHeight: "150px",
    },
    productName: {
        textAlign: "center",
        color: "#232F3E",
        cursor: "pointer",
        "& h3:hover": {
            color: "#FA9C23",
        },
    },
    ratingContainer: {
        display: "flex",
        justifyContent: "center",
    },
    reviews: {
        textAlign: "center",
        color: "#232F3E",
        fontWeight: 500,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    viewDetailsButton: {
        background: "#FA9C23",
        color: "#fff",
        marginTop: "10px",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
    },
}));

export default useStyles;
