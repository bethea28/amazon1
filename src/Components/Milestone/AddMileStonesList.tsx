import React, { useState, createContext } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormInput, MilestoneStr } from "../../Resources/Constants";
import { makeStyles } from "@material-ui/core";
import { Button, Box, Typography, Grid, Paper, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateData } from "../../Services/AddProjectService";
import AddMilestone from "./AddMilestone";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
      background: "#A6BBA7",
    },
    "& .MuiFormLabel-root": {
      padding: "0 30px",
      color: "#000000",
    },
  },
}));

export function AddMileStonesList() {
  const { id } = useParams();
  const classes = useStyles();
  const { handleSubmit } = useForm<ProjectFormInput>();
  const [milestones, setMilestones] = useState<MilestoneStr[]>([]);

  let milestoneInit: MilestoneStr = {
    name: "",
    amount: 0,
    targetDate: "",
  };

  const addMilestones = () => {
    const newMilestones = [...milestones];
    newMilestones.push(milestoneInit);
    setMilestones(newMilestones);
  };

  const removeMilestones = () => {
    const newMilestones = [...milestones];
    newMilestones.pop();
    setMilestones([...newMilestones]);
  };

  const onsubmit = async (data: ProjectFormInput) => {
    data.projectId = id!;
    data.milestones = milestones;
    console.log(data);
    try {
      await updateData(id!, data);
      alert("You have create milestones successfuly");
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("milestones", milestones);
  return (
    <Paper>
      <form className={classes.root} onSubmit={handleSubmit(onsubmit)}>
        <Typography sx={{ my: 0.5 }} variant="h4">
          Please Define Milestones
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={addMilestones}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                endIcon={<DeleteIcon />}
                onClick={removeMilestones}
              >
                Remove
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" type="submit">
                <Typography variant="button">Submit</Typography>
              </Button>
            </Grid>
          </Grid>
          {milestones.map((milestone) => (
            <AddMilestone milestone={milestone} />
          ))}
        </Box>
      </form>
    </Paper>
  );
}
