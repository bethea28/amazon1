import React,{useState, useEffect} from 'react'
import { Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Button, Box,
         Select,Grid,TextField, Input, Paper,makeStyles } from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axiosInstance from '../../apiConfig';
import { Auth } from 'aws-amplify';
import { padding } from '@mui/system';
import { Padding } from '@mui/icons-material'
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';


interface ProjectFormInput {
    projectName: String;
    targetFundingNum: String;
    targetFundingDate: Date;
    description: String;
    categories:  String;
}
// export type ProjectFormInput = {
//     Native: string;
//     TextField: string;
//     Select: number;
//     ReactSelect: NestedValue<{ value: string; label: string }>;
//     Checkbox: boolean;
//     switch: boolean;
//     RadioGroup: RadioGroupOption;
//     MUI_Slider: NumberRange;
//     ReactDatepicker: Date;
//     numberFormat: number;
//     downShift: DownshiftItem;
//     country: NestedValue<{ code: string; label: string; phone: string }>;
//   };

const useStyles = makeStyles (theme =>({
    root: {
        '& .MuiFormControl-root': {
            width:'80%',
            margin: theme.spacing(1),
            background: "rgb(166, 223, 139)",
            borderRadius:10,
            padding: '0 30px',
        }
    },
    label:{
        textTransform:'none'
    }
   
}))
export default function AddProject() {
    const classes = useStyles();

    const { control,register, handleSubmit} = useForm<ProjectFormInput>();
    
    const currencies = [
        {
          value: 'Food',
          label: 'Food',
        },
        {
          value: 'Art',
          label: 'Art',
        },
        {
          value: 'Car',
          label: 'Car',
        },
        {
          value: 'Tech',
          label: 'Tech',
        },
        {
            value: 'Other',
            label: 'Other',
          },
      ];
    const onSubmit = async (data: ProjectFormInput ) => {
        
        console.log("Name",data)
        return
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken();    
        return await axiosInstance.post('project', data, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }) 
    }
    
    return (
        <Paper>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)} autoComplete = "off">
        
            <Grid container>
            <Grid item xs = {4}>
            <Controller

                render={({ field }) => <TextField
                label = "Input name of your project" {...field}/>}
                name="projectName"
                control={control}
                defaultValue=""
                 
            />
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Project Name</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
            <Controller

                render={({ field }) => <TextField 
                label = "Input target funding amount "{...field}/>}
                name="targetFundingNum"
                control={control}
                defaultValue=""
                 
            />
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Target Funding Number</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
             <FormControl variant = "filled">
             <TextField
                select
                defaultValue=""
                label="Select categories"
                name="categories"
                inputProps={{
                    inputRef: (ref: { value: any; }) => {
                      if (!ref) return;
                      register({
                        label: "categories",
                        value: ref.value,
                      }); 
                    },
                  }}
                >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
             </FormControl>
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Select Categories</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
            <Controller

                render={({ field }) => <TextField 
                label = "Input descriptions of your project"
                multiline minRows={12} {...field}/>}
                name="description"
                control={control}
                defaultValue=""
                 
            />
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Project Description</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
            
            <Controller
              control={control}
              name="targetFundingDate"
              render={({ field: { value, ...fieldProps } }) => {
                return (
                    <ReactDatePicker
                    {...fieldProps}
                    className="input"
                    placeholderText="Select date"
                    selected={value}
                  />
                );
              }}
            />
            
            
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Project Description</Typography>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
            <Button variant="contained" 
            color="primary"
            type="button"
            >
            <Typography variant="button">Submit</Typography>
            </Button>
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Button variant="contained" 
            color="primary"
            type="submit">
            <Typography variant="button">Submit</Typography>
            </Button>
            </Grid>
            </Grid>
            
            </Grid>
            
            
      

        </form>
        </Paper>
        
    )
}
function register(arg0: { name: string; value: any; }) {
    throw new Error('Function not implemented.');
}

