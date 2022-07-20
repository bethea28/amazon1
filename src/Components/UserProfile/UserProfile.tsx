import React, { useState, useEffect } from 'react'
import { Box, StyledEngineProvider, Avatar } from '@mui/material';
import { Grid, Paper, Button, TextField} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AppbarPrivate from '../Navbar/AppbarPrivate';
import AppbarPublic from '../Navbar/AppbarPublic';
import "./Styles.css";
import UserProfileService from '../../Services/UserProfileService';
import { headerBox, bottomOutterBox } from '../Constants';
import { Amplify, Auth } from 'aws-amplify';
import { axiosInstance } from '../../Resources/Constants';

const UserProfile = () => {
  const [user_id, setUserId] = useState<String>('');
  const [bio, setBio] = useState<String>( '' );
  const [name, setName] = useState<String>( '' );
  const [email, setEmail] = useState<String>( '' );
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

  const username="zebra"

  useEffect(() => {
    //fetch()
  }, [])

  const register = async () => {  
    //Signup
  //   const user = await Auth.signUp({
  //     username:username,
  //     password:"Nada1998!",
  //     attributes: {
  //       email:"cohort@email.com"
  //     }
  //   })
  // console.log(user)

  //SignIn
  // const newUser = await Auth.signIn(username, "Nada1998!")
  // console.log(newUser);

  //Get currentSession
  // Auth.currentSession().then(res=>{
  //   let accessToken = res.getAccessToken();
  //   let jwt = accessToken.getJwtToken();
  //   console.log(jwt)
  //   const data = { name, email, bio }
  //   console.log("Bio: ")
  //   console.log(bio)
  //   const info = axiosInstance.post('/profile', data, {
  //     headers: {
  //       'Authorization': `Bearer ${jwt}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // })
  }

    const fetch = async () => {
    const response = await UserProfileService.getUserProfile("f1009b7c-28a6-4248-a9ea-5d7804772775")
    setName(response.name)
    setEmail(response.email)
    setBio(response.bio)
    }

  const handleSubmit=(event: React.MouseEvent<HTMLElement>)=>{
    event.preventDefault()
    const data = { name, email, bio }
    //register()
    //UserProfileService.updateUserProfile("f1009b7c-28a6-4248-a9ea-5d7804772775", data)
} 

  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1000}}>
        {userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />}
        <Box sx={{...headerBox}}>
          Picture
        </Box>
        <Box sx={{...bottomOutterBox}}>
          <Box sx={{ fontWeight: 'bold'}}>My Profile</Box>
          <Paper elevation={3} className="customPaper" >    
            <Box className="customBox">
              <Grid item container direction="row" justifyContent="space-between">
                <Grid item>
                  <Box sx={{ml: 1, mt: 1, color: '#FFFFFF', typography: 'subtitle2' }}>Personal Information</Box>
                </Grid>
                <Grid item>
                  <Box sx={{ml: 2, mr: 1}}>
                    <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25,  }} variant="contained" endIcon={<KeyboardArrowUpIcon />}></Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ml:2, m: 1, height: 3 / 4}}>
              <Grid container direction={"column"} component="form" spacing={1}>
                <Grid item>
                  <TextField fullWidth
                  id="outlined-basic" 
                  size="small"
                  label="Name"
                  InputLabelProps={{shrink: true}}
                  value={name}
                  onChange={event => {
                    setName(event.target.value);
                  }}/>
                </Grid>
                <Grid item>
                    <TextField fullWidth id="outlined-basic" label="email" 
                    InputLabelProps={{shrink: true}} value={email} 
                    variant="outlined" size="small" onChange={event => {
                      setEmail(event.target.value);
                    }}/>
                </Grid>
                <Grid item>
                  <Avatar />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={3} className="customPaper">    
            <Box className="customBox">   
              <Grid item container direction="row" justifyContent="space-between">
                <Grid item>
                  <Box sx={{ml: 1, mt:1, color: '#FFFFFF', typography: 'subtitle2' }}>Bio</Box>
                </Grid>
                <Grid item>
                  <Box sx={{ml: 2, mr: 1}}>
                    <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25,  }}  variant="contained" endIcon={<KeyboardArrowUpIcon />}></Button>
                  </Box>
                </Grid>
              </Grid> 
            </Box>
            <Box sx={{m:1, height: 3 / 4}}>
              <Grid container direction={"column"} component="form" spacing={1}>
                <Grid item>
                  <TextField fullWidth
                    id="outlined-multiline"
                    size="medium"
                    label="Bio"
                    value={bio}
                    onChange={event => {
                    setBio(event.target.value);
                  }}
                    multiline
                    rows={4}
                    InputLabelProps={{shrink: true}}
                  />
                </Grid>     
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={3} className="customPaper">    
            <Box className="customBox">   
              <Grid item container direction="row" justifyContent="space-between">
                <Grid item>
                  <Box sx={{ml: 1, mt: 1, color: '#FFFFFF', typography: 'subtitle2' }}>Interest</Box>
                </Grid>
                <Grid item>
                  <Box sx={{ml: 2, mr: 1}}>
                    <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25}} variant="contained" endIcon={<KeyboardArrowUpIcon />}></Button>
                  </Box>
                </Grid>
              </Grid> 
            </Box>
            <Box sx={{m:1, height: 3 / 4}}>
              <Grid container direction={"column"} component="form" spacing={1}>
                <Grid item>
                </Grid>     
              </Grid>
            </Box>
          </Paper>        
          <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <Box sx={{my: 2, mr:3}}> 
                <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} variant="contained" 
                onClick={handleSubmit}
                >Save Profile</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};
export default UserProfile;