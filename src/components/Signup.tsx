import React , {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField, Button, Typography}  from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { isPropertySignature } from 'typescript';


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
  const [form, setForm] = React.useState<Form>({username:"", password:"", email:""});
  const [errorMessage, setError] = React.useState("");

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
        //Props.errorMessage = JSON.stringify(error);
        return error;
      }
    }
  };

  const content = (
    <Container component="main" maxWidth="xs"  className="signUpBox">
      <form onSubmit={handleSubmit}>
      <Typography color="textPrimary">Sign Up</Typography>
        <Box display="flex" flexDirection="column" mt={5} p={5} height="200%" bgcolor="#D1e1D2">

          <Box display="flex" justifyContent="center" fontWeight={1} style={{minHeight: '3vh', fontSize: '1rem'}}>
            {errorMessage}
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