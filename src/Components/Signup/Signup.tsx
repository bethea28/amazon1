import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  ThemeProvider,
  Paper,
  TextField,
} from "@mui/material";
import UserService from "../../Services/UserService";
import { theme } from "../../Resources/GlobalTheme";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/Authentication/AuthService";
import { AuthContext } from "../../Context/AuthProvider";

interface IFormInput {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordverify: string;
  email: string;
  lastSignOn: string;
  createdAt: string;
}

interface signUpError {
  name: string;
  code: string;
}

function SignUp() {
  const { control, handleSubmit, getValues } = useForm<IFormInput>();
  const [errorMessage, setError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { setAuthData } = useContext(AuthContext);
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const username = data.username;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const password = data.password;
    const email = data.email;

    try {
      /** Add user to cognito */
      await AuthService.signUp(username, password, email);
      const user = await AuthService.signIn(username, password);
      setCurrentDate(new Date());
      setAuthData((prevState) => {
        return {
          ...prevState,
          isLoggedIn: true,
          id: user.userId,
          token: user.jwt,
        };
      });
      data.lastSignOn = currentDate.toLocaleString();

      /** Add user to dynamodb database */
      await UserService.addUser(user.jwt, data);
      setError("Sign up was successful!");
      navigate("/interests");
      return user;
    } catch (e: unknown) {
      if (e instanceof Error) {
        const errorMessage = e.message;
        setError(errorMessage);
      } else {
        setError("Something went wrong, please try again later!");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Grid container direction={"row"} spacing={2} justifyContent="center">
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            alignContent={"center"}
            style={{ minHeight: "100vh" }}
          >
            <Grid item className="signUpBox">
              <form>
                <Typography variant="h2">Sign Up</Typography>
                <Box height="25%">
                  <Grid
                    container
                    direction={"column"}
                    spacing={2}
                    justifyContent="center"
                  >
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
                            label="Username"
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
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({
                          field: { onChange, value = "" },
                          fieldState: { error },
                        }) => (
                          <TextField
                            fullWidth
                            label="First Name"
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
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({
                          field: { onChange, value = "" },
                          fieldState: { error },
                        }) => (
                          <TextField
                            fullWidth
                            label="Last Name"
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
                            label="Email"
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
                            label="Password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type={passwordShown ? "text" : "password"}
                          />
                        )}
                        rules={{
                          required: true,
                          minLength: 8,
                          pattern:
                            /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?]).*$/,
                        }}
                      />
                      <Button onClick={togglePassword}>Show Password</Button>
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
                            label="Verify Password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type={passwordShown ? "text" : "password"}
                          />
                        )}
                        rules={{
                          required: true,
                          minLength: 8,
                          validate: (value) => {
                            const { password } = getValues();
                            return (
                              password === value ||
                              "Your passwords do not match"
                            );
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        *Password must be at least 8 characters with 1 symbol
                        and 1 capitol letter
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        size="large"
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default SignUp;
