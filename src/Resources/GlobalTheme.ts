import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: '#335436',
        },
        secondary: {
            main: '#A6BBA7',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: "monospace",
                fontWeight: 600
            }
        }
    }
})
);