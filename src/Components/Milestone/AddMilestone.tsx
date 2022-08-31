import React, { useContext } from "react";
import { Dayjs } from "dayjs";
import { Milestone, MilestoneStr } from "../../Resources/Constants";
import { useForm, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Button, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Props {
  milestone: MilestoneStr;
}

export default function AddMilestone({ milestone }: Props) {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Milestone>();

  const onSubmit = (milestoneDate: Milestone) => {
    milestone.name = milestoneDate.name;
    milestone.amount = milestoneDate.amount;
    console.log(milestone.targetDate);
    milestone.targetDate = milestoneDate.targetDate.toLocaleDateString();
    reset();
  };
  const onReset = () => {
    reset();
  };
  const [value, setValue] = React.useState<Dayjs | null>(null);
  return (
    <Stack>
      <form onReset={() => reset()} autoComplete="off">
        <Grid container>
          <Grid item xs={4}>
            <TextField
              {...register("name", { required: true })}
              label="Input name of the milestone"
              defaultValue=""
              error={errors.name !== undefined}
            />
            {errors.name && (
              <Typography variant="body2" color="red">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography>Milestone Name</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              {...register("amount", { min: 0.01 })}
              type="number"
              label="Input target funding amount"
              defaultValue={0}
              error={errors.amount !== undefined}
            />
            {errors.amount && (
              <Typography variant="body2" color="red">
                Fund amount must be valid
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography> (USD) Fund Number</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Controller
              name="targetDate"
              defaultValue={new Date()}
              control={control}
              render={({ field }) => (
                <LocalizationProvider
                  sx={{ minWidth: 300 }}
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    label="Select Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography>Milestone Date</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSubmit(onReset)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}
