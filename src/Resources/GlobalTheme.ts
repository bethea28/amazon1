import { createTheme, responsiveFontSizes } from "@mui/material/styles";


export const theme = createTheme({
  palette: {
    primary: {
      main: '#335436',          //dark green
    },
    secondary: {
      main: '#A6BBA7',          //light green
    },
    white: {
      main: '#FFFFFF'
    },
    black: {
      main: '#000000'
    },
  },
  typography: {
    allVariants: {
    fontFamily: 'sans-serif',
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'sans-serif',
      }
    }
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    black: Palette['secondary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    black?: PaletteOptions['secondary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
    black: true;
  }
}
// export const theme = responsiveFontSizes(createTheme({
//   palette: {
//     primary: {
//       main: '#335436',
//     },
//     secondary: {
//       main: '#A6BBA7',
//     },
//   },
//   typography: {
//     fontFamily: 'Poppins',
//   },
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         fontFamily: 'sans-serif',
//       }
//     }
//   }
// })
// );