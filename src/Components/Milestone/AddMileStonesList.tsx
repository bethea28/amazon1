import React,{useState, useEffect,createContext,useContext} from 'react';
import { useForm } from "react-hook-form";
import { Milestone, ProjectFormInput,milestoneInit, MilestoneStr } from '../../Resources/Constants'
import { makeStyles, ExpansionPanel, ExpansionPanelSummary,
     Typography, ExpansionPanelDetails, Paper, Grid } from '@material-ui/core';
//import ExpandMoreIcon from "@material-ui/icons";
import { Button, Stack, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@material-ui/pickers';
import { updateData } from '../../Services/AddProjectService';
import AddMilestone from './AddMilestone';

export const UserContext = createContext<MilestoneStr>({
  name: '',
  amount: 0,
  targetDate:''
});

const projectId = "596146d3-af2a-4efe-8e0f-a29a73d22d68";
const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
}))


export function AddMileStonesList() {

    const classes = useStyles();
    const { handleSubmit } = useForm<ProjectFormInput>();

    const [milestones, setMilestones] = useState<MilestoneStr[]>([]);
    const [milestone, setMilestone] = useState<Milestone>();
    const [sd, setSd] = useState(0);
    let milestone1: MilestoneStr = {
      name: '',
      amount: 0,
      targetDate: ''
    }

    const addMilestones = () => {
      
        setMilestones([...milestones, milestone1]);
        setSd(sd + 1);
    };
    const removeMilestones = () => {

        const newMilestones = [...milestones]
        newMilestones.pop();

        setMilestones([...newMilestones]);
        setSd(sd - 1);
    };
    const handleChange = (event:any) => {
        setMilestone(event.target.value)
        
    }
    //console.log("milestone", milestones);
    
    const onsubmit = async (data: ProjectFormInput) => {
      
      data.projectId = projectId;
      data.milestones = milestones;
      console.log(data)
      try{
      await updateData(projectId, data);
      alert('You have submitted');
      }
      catch(error) {
        console.log(error)
      }
  }
    return (
      
      <form onSubmit={handleSubmit(onsubmit)}>
        <Typography>Milestones</Typography>
        <Box sx={{ width: '100%' }}>
          {milestones.map((milestone, index) => {
            return (
              <UserContext.Provider value={milestone}>
              <AddMilestone/>
              </UserContext.Provider>
            )
          })}
          <Grid container>
          <Grid item xs = {2}>
          <Button
            variant='contained'
            endIcon={<AddIcon />}
            onClick={() => addMilestones()}>
              Add
          </Button>
          </Grid>
          <Grid item xs = {2}>
          <Button
            variant='contained'
            endIcon={<DeleteIcon />}
            onClick={() => removeMilestones()}
          >
            Remove
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
          
        </Box>
        </form>
         
    )
}

// export const MileStoneForm = (props: any) => {
//     let milestone2: Milestone = {
//       name: '',
//       amount: 0,
//       targetDate: new Date(),
//     }
//     return (
//       <Stack spacing={2}>
//         <TextField onChange={(event) => props.handleChange(event)} />
//         <TextField 

//         type = "number"
//         defaultValue = {0}/>
  
//         <AddIcon />
//         <DeleteIcon />
//       </Stack>
//     )
//   }