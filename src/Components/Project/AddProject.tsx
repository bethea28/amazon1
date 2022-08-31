import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { Project, interests } from "../../Resources/Constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Typography,
  FormHelperText,
  ThemeProvider,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
  Grid,
  TextField,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../../Services/AddProjectService";
import { ProjectFormInput } from "../../Resources/Constants";
import { useNavigate } from "react-router-dom";
import { theme } from "../../Resources/GlobalTheme";

export default function AddProject() {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState<Project>();
  const { projectId } = currentProject! || {};
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormInput>();
  const onSubmit = async (data: ProjectFormInput) => {
    const { projectName, description, categories } = data;

    let state = {
      userId: "",
      projectName,
      targetFundingNum: data.targetFundingNum.toString(),
      targetFundingDate: data.targetFundingDate.toLocaleDateString(),
      description,
      categories,
    };
    console.log("state", state);
    try {
      const response = await postData(state);
      setCurrentProject(response);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const [value, setValue] = React.useState<Dayjs | null>(null);
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <form
          color="#335436"
          border-color="#335436"
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset()}
          autoComplete="off"
        >
          <Typography sx={{ my: 0.5 }} variant="h4">
            Add a Project
          </Typography>
          <Box>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ minWidth: 300 }}
                  {...register("projectName", { required: true })}
                  label="Input name of your project"
                  defaultValue=""
                  error={errors.projectName !== undefined}
                />
                {errors.projectName && (
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
                <Typography>Project Name</Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ minWidth: 300 }}
                  {...register("targetFundingNum", { min: 0.01 })}
                  type="number"
                  label="Input target funding amount"
                  defaultValue={0}
                  error={errors.targetFundingNum !== undefined}
                />
                {errors.targetFundingNum && (
                  <Typography variant="body2" color="red">
                    Target funding amount must be valid
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
                <Typography>Target Funding Number</Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <FormControl>
                  <InputLabel htmlFor="category-select">
                    Select Category
                  </InputLabel>
                  <Controller
                    name="categories"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <Select
                          sx={{ minWidth: 300 }}
                          value={field.value}
                          onChange={(e) => field.onChange(e)}
                        >
                          {interests.map((interest) => (
                            <MenuItem value={interest}>{interest}</MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  <FormHelperText error={errors.categories !== undefined}>
                    {errors.categories && (
                      <Typography variant="body2" color="red">
                        Please select category
                      </Typography>
                    )}
                  </FormHelperText>
                </FormControl>
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
                <Typography>Select Categories</Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="targetFundingDate"
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
                <Typography>Target Funding Date</Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ minWidth: 300 }}
                  {...register("description", { required: true })}
                  label="Input descriptions of your project"
                  multiline
                  minRows={12}
                  error={errors.description !== undefined}
                />
                {errors.description && (
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
                <Typography>Project Description</Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ my: 0.5 }}
              container
              direction={"row"}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" color="primary" type="reset">
                  <Typography variant="button">Reset</Typography>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" type="submit">
                  <Typography variant="button">Submit</Typography>
                </Button>
              </Grid>
              <Grid
                item
                xs={0}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate(`/addmilestones/${projectId}`)}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </ThemeProvider>
  );
}
