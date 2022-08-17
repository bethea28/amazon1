import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { createUser } from '../Services/CreateUserService';
import setAuthorizationToken from '../Services/SetAuthorizationToken';
import AppbarPublic from "./Navbar/AppbarPublic";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { match } from 'assert';
import { watch } from 'fs';

interface IFormInput {
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  passwordverify: string,
  email: string
};

function SignUp() {
  const { control, handleSubmit, register, getValues } = useForm<IFormInput>();
  const [errorMessage, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const username = data.username;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const password = data.password;
    const email = data.email;
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      const data = {
        userName: user.user.getUsername(),
        firstName: firstname,
        lastName: lastname,
        userSub: user.userSub,
        email: email
      };
      setAuthorizationToken();
      console.log(data);
      createUser({ data });
      setError("Sign up was successful!");
      navigate("/profile");
      return user;
    } catch (error) {
      if (typeof error === 'object' && error != null) {
        const errorObj = error;
        setError(JSON.stringify(errorObj));
        return error;
      }
    }
  };

  return (
    <Paper>
    <AppbarPublic />
    <Grid container direction={"row"} spacing={2} justifyContent="center">
    <Grid container direction={"column"} justifyContent="center" alignContent={"center"} style={{ minHeight: '100vh' }}>
    <Grid item className="signUpBox">
      <form>
        <Typography variant="h2">Sign Up</Typography>
        <Box height="25%" bgcolor="#D1e1D2">
          <Grid container direction={"column"} spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="caption">{errorMessage}</Typography>
            </Grid>
            <Grid item>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"Username"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="string"
                  />
                )}
                rules={{
                  required: true
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="firstname"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"First Name"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="string"
                  />
                )}
                rules={{
                  required: true
                }}
              />
              </Grid>
              <Grid item>
              <Controller
                name="lastname"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"Last Name"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="string"
                  />
                )}
                rules={{
                  required: true
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"Password"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="password"
                  />
                )}
                rules={{
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?]).*$/
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="passwordverify"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"PasswordVerify"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="password"
                  />
                )}
                rules={{
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?]).*$/,
                  validate: (value) => {
                    const { password } = getValues();
                      return password === value || "Your passwords do not match";
                  }
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value = "" },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    label={"Email"}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="string"
                  />
                )}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">*Password must be at least 8 characters with 1 symbol and 1 capitol letter</Typography>
            </Grid>
            <Grid item>
             <Button variant="outlined" type="submit" onClick={handleSubmit(onSubmit)}>
                <Typography variant="button">Sign Up</Typography>
              </Button>
            </Grid>
            </Grid>
        </Box>
      </form>
      </Grid>
      </Grid>
    </Grid>
    </Paper>
  );
}

export default SignUp;