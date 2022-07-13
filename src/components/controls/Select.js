import { FormControl, InputLabel, MenuItem, Select as MuiSelect,ThemeProvider } from '@material-ui/core';
import React from 'react'
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';


export default function Select(props) {

    const {name, label, value, onChange, options, ...other} = props;
    const theme = createTheme({
        palette: {
          primary: {
            light: green[200],
            main: '#90D86F',
            dark: green[600],
            contrastText: '#000',
            
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },

        
      });
    return (
        <ThemeProvider theme = {theme}>
        <FormControl
        variant = "filled">
            <InputLabel>{label}
            </InputLabel>
            <MuiSelect
            label = {label}
            name = {name}
            value = {value}
            { ...other}
            onChange = {onChange}>
                <MenuItem value ="">None</MenuItem>{
                    options.map(
                        item =>(<MenuItem key ={item.id} value = {item.title}>{item.title}</MenuItem>)
                    )
                }

            </MuiSelect>

        </FormControl>
        </ThemeProvider>
    )
}
