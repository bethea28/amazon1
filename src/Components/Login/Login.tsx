import React, { useState, useContext } from "react";
import { Box, Button, Typography, Grid, TextField, Paper } from "@mui/material";
import AuthService from "../../Services/Authentication/AuthService";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import UserService from "../../Services/UserService";
import { User } from "../../Resources/Constants";

interface IFormInput {
  username: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

function Login() {
  const { setAuthData } = useContext(AuthContext);
  const { control, handleSubmit } = useForm<IFormInput>();
  const [errorMessage, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as LocationState) || "/";
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const username = data.username;
    const password = data.password;
    try {
      const user = await await AuthService.signIn(username, password);
      setCurrentDate(new Date());
      const updatedUser: Partial<User> = {
        lastSignOn: currentDate.toLocaleString(),
      };
      const userId: string = user.userId;
      const token: string = user.jwt;

      setAuthData((prevState) => {
        return { ...prevState, id: userId, token: token, isLoggedIn: true };
      });
      await UserService.updateUser(userId, token, updatedUser);
      if (location.state) {
        navigate(from.pathname, { replace: true });
      } else {
        navigate("/");
      }
    } catch (error) {
      if (typeof error === "object" && error != null) {
        const errorObj = error;
        setError(JSON.stringify(errorObj));
        return error;
      }
    }
  };

  return (
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
              <Typography variant="h2">Sign In</Typography>
              <Box height="100%">
                <Grid container direction={"column"} spacing={2}>
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
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Log In
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

export default Login;
