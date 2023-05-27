import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        background: "#232F3E",
        minHeight: "8vh",
        padding: "10px 20px 10px 20px",
        display: "flex",
        alignItems: "center",
    },
    headerContent: {
        width: "100%",
    },
    logoContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    logo: {
        maxWidth: "160px",
        cursor: "pointer",
    },
    container: {
        width: '80%',
        margin: 'auto',
    },
    searchContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        border: '3px solid #fff',
        borderRight: 'none',
        padding: '5px',
        height: '20px',
        borderRadius: '5px 0 0 5px',
        outline: 'none',
    },
    searchButton: {
        width: '50px',
        height: '35px',
        border: '1px solid #FA9C23',
        backgroundColor: '#FA9C23',
        textAlign: 'center',
        color: '#000',
        borderRadius: '0 5px 5px 0',
        cursor: 'pointer',
    },
    searchIcon: {
        fontSize: '20px',
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '30px',
    },
    profileContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    avatar: {
        //
    },
    profileText: {
        color: "#fff",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "8ch",
    },
    profileIcon: {
        color: "#fff",
        cursor: "pointer",
    },
    loginButton: {
        background: "#FA9C23",
        color: "#000",
    },
    cartButton: {
        //
    },
    cartIcon: {
        color: "#FA9C23",
    },
}));

export default useStyles;
