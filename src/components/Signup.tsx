import React , {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField, Button, Typography}  from '@material-ui/core';
import { Auth } from 'aws-amplify';


type Props = {
  authState: string
  loading: boolean
  error: string
};


const SignIn: React.FC<Props> = ({ authState, loading, error }) => {
  type Form = { [key:string]: string };
  const [form, setForm] = React.useState<Form>({username:"", password:"", email:""});

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
        //insert toatr or some status message
        const request = {
          username: user.user.getUsername(),
          userSub: user.userSub
        }
        fetch('http://localhost:8080/api/sigup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(request)
        })

        return user;
      })
    } catch(error) {
      if (error) {
        console.log('There was an error on signup: ' + error);
        return error;
      }
    }
  };

  const content = (
    <Container component="main" maxWidth="xs"  className="signUpBox">
      <form onSubmit={handleSubmit}>
      <Typography color="textPrimary">Sign Up</Typography>
        <Box display="flex" flexDirection="column" flex mt={5} p={5} height="200%" bgcolor="#D1e1D2">

          <Box display="flex" justifyContent="center" fontWeight={100}>
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
            type="userName"
            onChange={handleChangeValue('userName')}
            value={form.userName}
            label={loading? " " : "Username"}
            variant="outlined"
            required
            fullWidth
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              label={loading? " " : "Password"}
              type="password"
              onChange={handleChangeValue('password')}
              value={form.password}
              variant="outlined"
              required
              fullWidth
            />
            </Box>
            <Box width="100%" my={2}>
            <TextField
              type="email"
              onChange={handleChangeValue('email')}
              value={form.email}
              label={loading? " " : "Email Address"}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          <Box width="100%" mt={4} mb={2}>
            <Button data-testid="submitButton" disabled={loading} type="submit">
              <Typography>Sign Up</Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
    return (authState === 'signIn' ) ? content : null;
}

export default SignIn;