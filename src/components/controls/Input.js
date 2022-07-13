import { TextField,ThemeProvider } from '@material-ui/core'
import React from 'react'
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';


export default function Input(props) {

    const {name, label, value, onChange, ...other} = props
    const theme = createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#90D86F',
            dark: green[600],
            
          }
        }
      });
    return (
        <ThemeProvider theme = {theme}>
        <TextField
        variant = "filled"
        label = {label}
        name =  {name}
        value = {value}
        onChange = {onChange} 
        { ...other}
        />
        </ThemeProvider>
    )
}
