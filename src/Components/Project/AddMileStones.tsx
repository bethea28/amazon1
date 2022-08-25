import React,{useState, useEffect} from 'react';
import { Milestone } from '../../Resources/Constants'
import { makeStyles, ExpansionPanel, ExpansionPanelSummary,
     Typography, ExpansionPanelDetails, Paper, Grid } from '@material-ui/core';
//import ExpandMoreIcon from "@material-ui/icons";
import { Button, Stack, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
}))


export function AddMileStones() {
    const classes = useStyles();

    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [milestone, setMilestone] = useState<Milestone>();
    const [sd, setSd] = useState(0);
   

    const addMilestones = () => {
        console.log("sdfg");
        let milestone1: Milestone = {
            name: "",
            amount: 0,
            targetDate: new Date()
        }
        //const newMilestones = [...milestones]
        //milestones.push(milestone1);
        setMilestones([...milestones, milestone1]);
        setSd(sd + 1);
    };
    const removeMilestones = () => {

        const newMilestones = [...milestones]
        newMilestones.pop();

        setMilestones([...newMilestones]);
        setSd(sd - 1);
    };
    console.log("milestone", milestones);
    
    return (
        
        <Box sx={{width:'100%'}} >
            {milestones.map((milestone,index) =>{

                return (<MileStoneForm
                onChange={setMilestone}
                values={milestone}
                key={index}
                />
                
                //<MilestonePanel sd = {sd} />
            )})}
        <Button  variant="contained" endIcon={<AddIcon/>} onClick={() => addMilestones()}>
            Add
        </Button>
        <Button  variant="contained" endIcon={<DeleteIcon/>} onClick={() => removeMilestones()}>
            Remove
        </Button>
        </Box>
        
    )
}

  export const MileStoneForm = () => {
    let milestone2: Milestone = {
        name: "",
        amount: 0,
        targetDate: new Date()
    }
    return (
    <Stack spacing={2}>
        <TextField />
        <TextField />
        
        <AddIcon />
        <DeleteIcon />
    </Stack>

    )
}
  