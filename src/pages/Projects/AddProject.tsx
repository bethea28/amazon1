import React,{useState, useEffect} from 'react'
import { Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Button, Box,
         Select,Grid,TextField, Input, Paper,makeStyles } from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker,DatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller, SubmitHandler, DefaultValues } from "react-hook-form";
import axiosInstance from '../../apiConfig';
import { Auth } from 'aws-amplify';
import { padding } from '@mui/system';
import { FireplaceRounded, Padding } from '@mui/icons-material'
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';

// interface ICategories{ 
//     label: string;
//     value: string;
// }


interface ProjectFormInput {
    projectName: string;
    targetFundingNum: string;
    targetFundingDate: Date | null;
    description: string;
    categories: string;
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
            
        },
        "& .MuiFormLabel-root": {
            padding: '0 30px',
          }
    },
    // label:{
    //     textTransform:'none',
        
    // }
   
}))
export default function AddProject() {
    const classes = useStyles();
    const [targetDate, setDate] = useState<Date | null>(null);

    const { reset, control, register, handleSubmit} = useForm<ProjectFormInput>();
    
    // const categoriesSelect:ICategories[]=[
    //     {
    //       value: 'Food',
    //       label: 'Food',
    //     },
    //     {
    //       value: 'Art',
    //       label: 'Art',
    //     },
    //     {
    //       value: 'Car',
    //       label: 'Car',
    //     },
    //     {
    //       value: 'Tech',
    //       label: 'Tech',
    //     },
    //     {
    //         value: 'Other',
    //         label: 'Other',
    //       },
    //   ];
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
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()} autoComplete = "off">
        
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
            <FormControl>
                <InputLabel htmlFor="category-select">
                    Select Category 
                </InputLabel>
               
                <Controller
                    name="categories"
                    control={control}
                    defaultValue=""
                    render={({ field }) => {
                    return <Select 
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                     >
                        <MenuItem value="Tech">Tech</MenuItem>
                        <MenuItem value="Art">Art</MenuItem>
                        <MenuItem value="Car">Car</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Pet">Pet</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    }}
                />
                
            </FormControl>
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Select Categories</Typography>
            </Grid>
            </Grid>
            
            <Grid container>
            <Grid item xs = {4}>
            <Controller
              name="targetFundingDate"
              defaultValue = {null}
              control={control}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    inputVariant="outlined"
                    variant="inline"
                    label="Select Date"
                    value={field.value}
                    onChange={(e)=>field.onChange(e)}
                    format="MM/dd/yyyy"
                    defaultValue = {null}
                    autoOk
                  />
                </MuiPickersUtilsProvider>
            )}
            />

            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Target Funding Date</Typography>
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
            <Button variant="contained" 
            color="primary"
            type="reset"
            >
                <Typography variant="button">Reset</Typography>
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


