import React,{createContext,useContext} from 'react'
import { Milestone, MilestoneStr } from '../../Resources/Constants';
import { useForm, Controller} from "react-hook-form";
import { Typography, FormHelperText, ThemeProvider } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Grid, Paper, makeStyles } from '@material-ui/core';
import { Button, Stack, TextField, Box } from '@mui/material';
import {MuiPickersUtilsProvider, KeyboardDatePicker}from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { AddMileStonesList, UserContext } from './AddMileStonesList';
export default function AddMilestone() {

    const milestoneInfo = useContext<MilestoneStr>(UserContext);

    const { reset, control, register, handleSubmit,formState: { errors }} = useForm<Milestone>();

    const onChange = (milestoneDate: Milestone) => {
      milestoneInfo.name = milestoneDate.name;
      milestoneInfo.amount = milestoneDate.amount;
      milestoneInfo.targetDate = milestoneDate.targetDate.toLocaleDateString();
      }
  return (
    <Stack>
       <form onChange={handleSubmit(onChange)}
       onReset={() => reset()} autoComplete = "off">
       <Grid container>
            <Grid item xs = {4}>
                <TextField
                {...register("name", {required: true})} 
                label = "Input name of the milestone"
                defaultValue = ""
                error={errors.name !== undefined}
                />
                {errors.name && ( 
                <Typography variant ="body2" color ="red">This field is required</Typography>)}
                
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Milestone Name</Typography>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs = {4}>
                <TextField
                {...register("amount",{ min: 0.01, })} 
                type = "number"
                label = "Input target funding amount"
                defaultValue = {0}
                error={errors.amount !== undefined }
                />
                {errors.amount && (
                <Typography variant ="body2" color ="red">Fund amount must be valid</Typography>)}
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography> (USD) Fund Number</Typography>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs = {4}>
            <Controller
              name="targetDate"
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
                <Typography>Milestone Date</Typography>
            </Grid>
            </Grid>
       </form>
    </Stack>
  )
}
