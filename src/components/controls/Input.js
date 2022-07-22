import { TextField,ThemeProvider } from '@material-ui/core'
import React from 'react'
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';


export default function Input(props) {

    const {name, label, value, error = null, onChange, ...other} = props
    
    return (
       
        <TextField
        variant = "filled"
        label = {label}
        name =  {name}
        value = {value}
        onChange = {onChange} 
        {...(error && {error:true,helperTest:error})}
        { ...other}
        />
       
    )
}
