import React,{useState, useEffect} from 'react';
import { Typography, FormHelperText, Stack } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Button,
         Select, Grid, TextField, Paper, makeStyles } from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller} from "react-hook-form";
import {postData} from '../../Services/AddProjectService';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProjectFormInput {
    projectName: string;
    targetFundingNum: number;
    targetFundingDate: Date;
    description: string;
    categories: string;
    milestones: Milestone[];
    
}
interface Milestone {
    name: string;
    amount: number;
    targetDate: Date;
}

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
    }
}))

export default function AddProject() {
    const [milestones, setMilestones] = useState([])

    const handleAdd =() => {
        const newMilestones = [...milestones]
        //newMilestones.push({})

        setMilestones(newMilestones)
    }

     const handleRemove =(index: number) => {
        const newMilestones = [...milestones]
        newMilestones.splice(index, 1)
        setMilestones(newMilestones)
    }
    const [sd, setSd] = React.useState(0);

//     const addPoint = () => {
//         console.log("sdfg");
//         let milestone: Milestone = {};
    
//         arr.push("dummy");
//         // setPoints([...arr]);
//         setMilestones([...points, arr]);
//         setSd(sd + 1);
//     };
//   console.log("p", points);
    // const MileStoneFormRow = ({onAdd, onRemove}) => {

    //     return (
    //     <Stack>
    //         <TextField />
    //         <TextField />
    //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
    //         </MuiPickersUtilsProvider>
    //         <AddIcon />
    //         <DeleteIcon />
    //     </Stack>
    
    //     )}

    const classes = useStyles();
    const { reset, control, register, handleSubmit,formState: { errors }} = useForm<ProjectFormInput>();
    const onSubmit = async (data: ProjectFormInput ) => {

        const{projectName, description,categories} = data

        let state = {
            userId: '002',
            projectName,
            targetFundingNum:data.targetFundingNum.toString(),
            targetFundingDate:data.targetFundingDate.toLocaleDateString(),
            description,
            categories,
        }
        console.log("state",state)
        try{
            await postData(state)
            reset() 
        }
        catch(error){
            console.log(error)
        }
    
    }
    return (
        <Paper>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()} autoComplete = "off">
            <Grid container>
            <Grid item xs = {4}>
                <TextField
                {...register("projectName", {required: true})} 
                label = "Input name of your project"
                defaultValue = ""
                error={errors.projectName !== undefined}
                />
                {errors.projectName && ( 
                <Typography variant ="body2" color ="red">This field is required</Typography>)}
                
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Project Name</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
                <TextField
                {...register("targetFundingNum",{ min: 0.01, })} 
                type = "number"
                label = "Input target funding amount"
                defaultValue = {0}
                error={errors.targetFundingNum !== undefined }
                />
                {errors.targetFundingNum && (
                <Typography variant ="body2" color ="red">Target funding amount must be valid</Typography>)}
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
                    rules={{required:true}}
                    render={({ field }) => {
                    return <Select 
                        value={field.value}
                        onChange={(e) => field.onChange(e)} >
                        <MenuItem value="Tech">Tech</MenuItem>
                        <MenuItem value="Art">Art</MenuItem>
                        <MenuItem value="Car">Car</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Pet">Pet</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    }}/>
                <FormHelperText error={errors.categories !== undefined}>  
                {errors.categories && (<Typography variant ="body2" color ="red">Please select category</Typography>)}
                </FormHelperText>
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
              defaultValue = {new Date()}
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
                autoOk/>
            </MuiPickersUtilsProvider>
            )}/>
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Target Funding Date</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {4}>
                <TextField
                {...register("description", {required: true})} 
                label = "Input descriptions of your project"
                multiline minRows={12} 
                error={errors.description !== undefined}/>   
                {errors.description && (
                <Typography variant ="body2" color ="red">This field is required</Typography>)}
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Project Description</Typography>
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs = {2}>
                <Button variant="contained" 
                color="primary"
                type="reset">
                <Typography variant="button">Reset</Typography>
                </Button>
            </Grid>
            <Grid item xs = {2} >
                <Button variant="contained" 
                color="primary"
                type="submit">
                <Typography variant="button">Submit</Typography>
                </Button>
            </Grid>
            </Grid>

        </form>
        </Paper>
    )
}


