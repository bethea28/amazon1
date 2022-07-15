import React from 'react'
import {MuiPickersUtilsProvider,KeyboardDatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import {ThemeProvider} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';

export default function DatePicker(props) {

    const {name, label, value, onChange, ...other} = props;
    const converToDefEventPara = (name, value) =>({
        target:{
            name,value
        }
    })
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            name = {name}
            label={label}
            value={value}
            { ...other}
            onChange={date =>onChange(converToDefEventPara(name,date))}
            />
        </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}
