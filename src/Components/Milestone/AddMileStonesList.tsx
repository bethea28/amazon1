import React,{useState,createContext} from 'react';
import { useForm } from "react-hook-form";
import { ProjectFormInput,MilestoneStr } from '../../Resources/Constants'
import { makeStyles,Typography, Grid } from '@material-ui/core';
import { Button,Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateData } from '../../Services/AddProjectService';
import AddMilestone from './AddMilestone';
import { useParams} from 'react-router-dom';

export const UserContext = createContext<MilestoneStr>({
  name: '',
  amount: 0,
  targetDate:''
});

//const projectId = "596146d3-af2a-4efe-8e0f-a29a73d22d68";
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

    const { id } = useParams();
    const classes = useStyles();
    const { handleSubmit } = useForm<ProjectFormInput>();
    const [milestones, setMilestones] = useState<MilestoneStr[]>([]);

    let milestone1: MilestoneStr = {
      name: '',
      amount: 0,
      targetDate: ''
    }

    const addMilestones = () => {
        const newMilestones = [...milestones]
        setMilestones([...newMilestones, milestone1]);
    };

    const removeMilestones = () => {
        const newMilestones = [...milestones]
        newMilestones.pop();
        setMilestones([...newMilestones]);
    };

    const onsubmit = async (data: ProjectFormInput) => {
      data.projectId = id!;
      data.milestones = milestones;
      console.log(data)
      try{
      await updateData(id!, data);
      alert('You have create milestones successfuly');
      window.location.reload();
      }
      catch(error) {
        console.log(error)
      }
  }
    return (
      <form onSubmit={handleSubmit(onsubmit)}>
        <Typography>Please Define Milestones</Typography>
        <Box sx={{ width: '100%' }}>
          {milestones.map((milestone, index) => {
            return (
              <UserContext.Provider value={milestone}
              key = {index}>
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
