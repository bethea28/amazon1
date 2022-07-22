import { FormControl, InputLabel, MenuItem, Select as MuiSelect,ThemeProvider } from '@material-ui/core';
import React from 'react'
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import { FormHelperText } from '@mui/material';


export default function Select(props) {

    const {name, label, value, error = null, onChange, options, ...other} = props;
    
    return (
        
        <FormControl variant = "filled"
        {...(error && {error:true})}>
            <InputLabel>{label}
            </InputLabel>
            <MuiSelect
            label = {label}
            name = {name}
            value = {value}
            { ...other}
            onChange = {onChange}>
                <MenuItem value ="">None</MenuItem>{
                    options.map(item =>(<MenuItem key ={item.id} value = {item.title}>{item.title}</MenuItem>))
                }

            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
       
    )
}
