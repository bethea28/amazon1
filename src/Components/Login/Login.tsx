import React , { useState, useContext } from 'react';
import { Box, Container, Button, Typography, Grid, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import SetAuthorizationToken from '../../Services/Authentication/SetAuthorizationToken';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLocation, useNavigate,  } from "react-router-dom";
import { AuthContext } from '../../Context/AuthProvider'

interface IFormInput {
  username: string,
  password: string,
};

interface LocationState {
  from: {
    pathname: string;
  };
}

  function Login() {

    const { setAuthData } = useContext(AuthContext)
    const { control, handleSubmit } = useForm<IFormInput>();
    const [errorMessage, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state as LocationState || "/"

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
      const username = data.username;
      const password = data.password;
      try {
        const user = await Auth.signIn({
          username,
          password
        });
        const userId = user.attributes.sub
        const token:string = await SetAuthorizationToken()
        
        setAuthData(prevState => {
          return {...prevState, ['id']: userId , ['token']: token, ['isLoggedIn']: true}
        })

        if(location.state){
            navigate(from.pathname, {replace: true}); 
          }
        else{
          navigate("/");
        }
        
      } catch (error) {
        if (typeof error === 'object' && error != null) {
          const errorObj = error;
          setError(JSON.stringify(errorObj));
          return error;
        }
      }
    }

    return (
      <Container component="main" maxWidth="xs" className="signUpBox">
        <form>
          <Typography variant="h2">Log In</Typography>
          <Box height="100%" bgcolor="#D1e1D2">
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
                />
              </Grid>
              <Grid item>
                <Button variant="outlined" type="submit" onClick={handleSubmit(onSubmit)}>
                  <Typography variant="button">Log In</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }

  export default Login;