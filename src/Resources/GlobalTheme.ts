import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: '#90d86f',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: "Poppins"
            }
        }
    }
})
);