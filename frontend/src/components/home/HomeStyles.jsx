import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    productName: {
        textAlign: 'center',
        color: '#232F3E',
        cursor: "pointer",
        '& h3:hover': {
            color: '#FA9C23',
        },
    }
}));

export default useStyles;