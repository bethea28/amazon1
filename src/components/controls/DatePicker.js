import React from 'react'
import {MuiPickersUtilsProvider,KeyboardDatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {

    const {name, label, value, onChange, ...other} = props;
    const converToDefEventPara = (name, value) =>({
        target:{
            name,value
        }
    })
    
    return (
        
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
      
    )
}
