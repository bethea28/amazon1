import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormInput, MilestoneStr } from "../../Resources/Constants";
import { makeStyles } from "@material-ui/core";
import { Button, Box, Typography, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateData } from "../../Services/AddProjectService";
import AddMilestone from "./AddMilestone";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    try {
      await updateData(id!, data);
      alert("You have create milestones successfuly");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className={classes.root} onSubmit={handleSubmit(onsubmit)}>
          <Grid container sx={{ minWidth: 900 }}>
            <Grid item xs={8.5}>
              <Typography sx={{ my: 0.5 }} variant="h4">
                Please Define Milestones
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={addMilestones}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                endIcon={<DeleteIcon />}
                onClick={removeMilestones}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {milestones.map((milestone) => (
              <AddMilestone milestone={milestone} />
            ))}
          </Grid>
          <Box
            sx={{
              width: "80%",
              my: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              <Typography variant="button">Submit</Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
