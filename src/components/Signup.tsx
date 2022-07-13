import React , {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField, Button}  from '@material-ui/core';
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
    //signIn(form['userName'], form['password'], form['email']);
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
        //axios.post('http://localhost:8080/api/signup', clientData, headers);
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
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={1} p={2} height="200%">
Sign Up
          <Box display="flex" justifyContent="center" fontWeight={100} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
            autoComplete="userName"
            type="userName"
            onChange={handleChangeValue('userName')}
            value={form.userName}
            label={loading? " " : "Username"}
            variant="outlined"
            required
            fullWidth
            inputProps={{"data-testid":"userName"}}
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              label={loading? " " : "Password"}
              type="password"
              autoComplete="current-password"
              onChange={handleChangeValue('password')}
              value={form.password}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"password"}}
            />
            </Box>
            <Box width="100%" my={2}>
            <TextField
              autoComplete="email"
              type="email"
              onChange={handleChangeValue('email')}
              value={form.email}
              label={loading? " " : "Email Address"}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"email"}}
            />
          </Box>
          <Box width="100%" mt={4} mb={2}>
            <Button data-testid="submitButton" disabled={loading} type="submit">
              Sign Up
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
    return (authState === 'signIn' ) ? content : null;
}

export default SignIn;