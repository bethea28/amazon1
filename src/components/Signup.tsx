import React , { MouseEvent, FormEvent, ChangeEvent, useState } from 'react';
import { Box, Container, Link, TextField, Button, Typography, Grid }  from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { withStyles } from "@material-ui/core/styles";


type Props = {
  authState: string
  loading: boolean
  };

async function getJwtToken() {
  var token = '';
  const session = await Auth.currentSession().then((result) => {
    token = result.getAccessToken().getJwtToken();
  })
  return token;
}

const SignIn: React.FC<Props> = ({ authState, loading }: Props) => {
  type Form = { [key:string]: string };
  const [form, setForm] = useState<Form>({username:"", password:"", email:""});
  const [errorMessage, setError] = useState("");

  type FormKey = "userName" | "password" | "email";
  const handleChangeValue = (fieldName: FormKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const newForm = {...form};
    newForm[fieldName] = event.currentTarget.value;
    setForm(newForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const username = form.userName;
    const password = form.password;
    const email = form.email;
    console.log(username + ' ' + password + ' ' + email);

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      .then((user) => {
        console.log(user);
        const request = {
          username: user.user.getUsername(),
          userSub: user.userSub
        }
        const token = async (): Promise<string> => {
          const response = await getJwtToken();
          fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': response
            },
            mode: 'cors',
            body: JSON.stringify(request)
          }).then(data => response);
          return response;
        }
        setError("");
        return user;
      })
    } catch(error) {
      console.log(JSON.stringify(error));
      if (typeof error === 'object' && error != null)
      {
        console.log('There was an error on signup: ' + error);
        const errorObj = error;
        console.log(errorObj);
        setError(JSON.stringify(errorObj));
        return error;
      }
    }
  };

  const content = (
    <Container component="main" maxWidth="xs"  className="signUpBox">
      <form onSubmit={handleSubmit}>
      <Typography variant="h2">Sign Up</Typography>
        <Box height="250%" bgcolor="#D1e1D2">
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Typography variant="caption">{errorMessage}</Typography>
            </Grid>
            <Grid item>
              <TextField
              type="userName"
              onChange={handleChangeValue('userName')}
              value={form.userName}
              label={loading? " " : "Username"}
              variant="outlined"
              required
              fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label={loading? " " : "Password"}
                type="password"
                onChange={handleChangeValue('password')}
                value={form.password}
                variant="outlined"
                required
                fullWidth
              />
              </Grid>
              <Grid item>
              <TextField
                type="email"
                onChange={handleChangeValue('email')}
                value={form.email}
                label={loading? " " : "Email Address"}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">*Password must be at least 8 characters with 1 symbol and 1 capitol letter</Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" disabled={loading} type="submit">
                <Typography variant="button">Sign Up</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
    return (authState === 'signIn' ) ? content : null;
}

export default SignIn;