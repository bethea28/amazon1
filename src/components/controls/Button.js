import React from 'react'
import { Button as MuiButton, makeStyles, ThemeProvider } from '@material-ui/core'
//import { isClassExpression } from 'typescript';
import { createTheme } from '@mui/material/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme =>({
    root: {
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform:'none'
    }
    

    
    
}))

export default function Button(props) {

    const theme = createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#90D86F',
            dark: green[600],
            
          }
        }
      });
    const {text, size, color, variant, onClick, ...other} = props
    const classes = useStyles();
    return (
        <ThemeProvider theme = {theme}>
        <MuiButton
        variant = {variant || "contained"}
        size = {size || "large" }
        color = {color || "primary"}
        onClick = {onClick}
        {...other}
            classes = { {root: classes.root, label: classes.label}}>
        {text}

        </MuiButton>
        </ThemeProvider>
        

    )
}
