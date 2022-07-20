import React , {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField, Button, Typography}  from '@mui/material';
// import { Auth } from 'aws-amplify';
import { isPropertySignature } from 'typescript';

// type Props = {
//   authState: string
//   loading: boolean
//   };

// const SignIn: React.FC<Props> = ({ authState, loading }: Props) => {
//   console.log("wtf")

// async function signIn2() {
//   const { user } = await Auth.signUp({
//             username:"Cohort9",
//             password:"Nada1998!",
//             attributes: {
//               email:"c@email.com"
//             }
//           })
//           .then((user) => {
//             console.log(user);
//   // console.log("trying")
//   //     const user = await Auth.signIn("Cohort6", "Nada1998!");
//       // .then(response => {
//       //   console.log(response);
//       // })
// }

//   return (
//     <React.Fragment>
//       <div>
//     <Box sx={{border:2, color:"blue"}}>
//     <Button sx={{border:3}} onClick={signIn2}></Button>
//     </Box>
//   </div>
//     </React.Fragment>
  
//   );
// }
    

// export default SignIn;

// type Props = {
//   authState: string
//   loading: boolean
//   };

// async function getJwtToken() {
//   var token = '';
//   const session = await Auth.currentSession().then((result) => {
//     token = result.getAccessToken().getJwtToken();
//   })
//   return token;
// }

// const SignIn: React.FC<Props> = ({ authState, loading }: Props) => {
//   type Form = { [key:string]: string };
//   const [form, setForm] = React.useState<Form>({username:"", password:"", email:""});
//   const [errorMessage, setError] = React.useState("");

//   type FormKey = "userName" | "password" | "email";
//   const handleChangeValue = (fieldName: FormKey) => (event: ChangeEvent<HTMLInputElement>) => {
//     const newForm = {...form};
//     newForm[fieldName] = event.currentTarget.value;
//     setForm(newForm);
//   };

  
// }
//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     const username = form.userName;
//     const password = form.password;
//     const email = form.email;
//     console.log(username + ' ' + password + ' ' + email);

//     try {
//       const { user } = await Auth.signUp({
//         username,
//         password,
//         attributes: {
//           email
//         }
//       })
//       .then((user) => {
//         console.log(user);
//         //insert toatr or some status message
//         const request = {
//           username: user.user.getUsername(),
//           userSub: user.userSub
//         }
//         // const token = async (): Promise<string> => {
//         //   const response = await getJwtToken();
//         //   fetch('http://localhost:8080/api/signup', {
//         //     method: 'POST',
//         //     headers: {
//         //       'Content-Type': 'application/json',
//         //       'Authorization': response
//         //     },
//         //     mode: 'cors',
//         //     body: JSON.stringify(request)
//         //   }).then(data => response);
//         //   return response;
//         // }
//         sign()
//         console.log('test')
//         Auth.signIn('Cohort3', 'Nada1998!').then(response => {
//           console.log(response);})
//         Auth.currentSession().then(res=>{
//           let accessToken = res.getAccessToken()
//           let jwt = accessToken.getJwtToken()
//           //You can print them to see the full objects
//           console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
//           console.log(`myJwt: ${jwt}`)
//         })
//         //const {data} = Auth.signIn(username, password);
// //console.log(`onSignIn::Response#1: ${JSON.stringify(data, null, 2)}`);
//         setError("");
//         return user;
//       })
//     } catch(error) {
//       console.log(JSON.stringify(error));
//       if (typeof error === 'object' && error != null)
//       {
//         console.log('There was an error on signup: ' + error);
//         const errorObj = error;
//         console.log(errorObj);
//         setError(JSON.stringify(errorObj));
//         //Props.errorMessage = JSON.stringify(error);
//         return error;
//       }
//     }
//   };





//     // event.preventDefault();
//     // const username = form.userName;
//     // const password = form.password;
//     // const email = form.email;
//     // console.log(username + ' ' + password + ' ' + email);

//     // try {
//     //   const { user } = await Auth.signUp({
//     //     username,
//     //     password,
//     //     attributes: {
//     //       email
//     //     }
//     //   })
//     //   .then((user) => {
//     //     console.log(user);
//     //     //insert toatr or some status message
//     //     const request = {
//     //       username: user.user.getUsername(),
//     //       userSub: user.userSub
//     //     }
//     //     const token = async (): Promise<string> => {
//     //       const response = await getJwtToken();
//     //       fetch('http://localhost:8080/api/signup', {
//     //         method: 'POST',
//     //         headers: {
//     //           'Content-Type': 'application/json',
//     //           'Authorization': response
//     //         },
//     //         mode: 'cors',
//     //         body: JSON.stringify(request)
//     //       }).then(data => response);
//     //       console.log(response);
        
//         //   async function signIn() {
//         //     try {
//         //         const user = await Auth.signIn(username, password);
//         //         console.log(`user: ${user}`)
//         //     } catch (error) {
//         //         console.log('error signing in', error);
//         //     }
//         // }
//   //         Auth.currentAuthenticatedUser(user => {
//   //           user.getSession((err, session) => {
//   //             if(err) {
//   //               throw new Error(err);
//   //             }
      
//   //             const sessionToken = session.getIdToken().jwtToken;
      
//   //             fetchItems(sessionToken)
//   //               .then(setItems)
//   //               .catch(err => console.log(err));
//   //           });
//   //         });
//   //         return response;
          
//   //       }
//   //       setError("");
//   //       return user;
//   //     })
//   //   } catch(error) {
//   //     console.log(JSON.stringify(error));
//   //     if (typeof error === 'object' && error != null)
//   //     {
//   //       console.log('There was an error on signup: ' + error);
//   //       const errorObj = error;
//   //       console.log(errorObj);
//   //       setError(JSON.stringify(errorObj));
//   //       //Props.errorMessage = JSON.stringify(error);
//   //       return error;
//   //     }
//   //   }
//   // };

// //===========================================
// // Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.

// // var authenticationData = {
// //   Username : username,
// //   Password : 'password',
// // };
// // var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
// // var poolData = { UserPoolId : 'us-east-1_ExaMPle',
// //   ClientId : '1example23456789'
// // };
// // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// // var userData = {
// //   Username : 'username',
// //   Pool : userPool
// // };
// // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
// // cognitoUser.authenticateUser(authenticationDetails, {
// //   onSuccess: function (result) {
// //       var accessToken = result.getAccessToken().getJwtToken();

// //       /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
// //       var idToken = result.idToken.jwtToken;
// //   },

// //   onFailure: function(err) {
// //       alert(err);
// //   },

// // });
// //===========================================
//   // const jwtToken = Auth.currentSession().then(res=>{
//   //   let accessToken = res.getAccessToken()
//   //   let jwt = accessToken.getJwtToken()
//   //   //You can print them to see the full objects
//   //   console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
//   //   console.log(`myJwt: ${jwt}`)
//   // });

//   const content = (
//     <Container component="main" maxWidth="xs"  className="signUpBox">
//       <form onSubmit={handleSubmit}>
//       <Typography color="textPrimary">Sign Up</Typography>
//         <Box display="flex" flexDirection="column" mt={5} p={5} height="200%" bgcolor="#D1e1D2">

//           <Box display="flex" justifyContent="center" fontWeight={1} style={{minHeight: '3vh', fontSize: '1rem'}}>
//             {errorMessage}
//           </Box>
//           <Box width="100%" my={2}>
//             <TextField
//             type="userName"
//             onChange={handleChangeValue('userName')}
//             value={form.userName}
//             label={loading? " " : "Username"}
//             variant="outlined"
//             required
//             fullWidth
//             />
//           </Box>
//           <Box width="100%" my={2}>
//             <TextField
//               label={loading? " " : "Password"}
//               type="password"
//               onChange={handleChangeValue('password')}
//               value={form.password}
//               variant="outlined"
//               required
//               fullWidth
//             />
//             </Box>
//             <Box width="100%" my={2}>
//             <TextField
//               type="email"
//               onChange={handleChangeValue('email')}
//               value={form.email}
//               label={loading? " " : "Email Address"}
//               variant="outlined"
//               required
//               fullWidth
//             />
//           </Box>
//           <Box width="100%" mt={4} mb={2}>
//             <Button data-testid="submitButton" disabled={loading} type="submit">
//               <Typography>Sign Up</Typography>
//             </Button>
//           </Box>
//         </Box>
//       </form>
//     </Container>
//   );
//     return (authState === 'signIn' ) ? content : null;
// }

// export default SignIn;