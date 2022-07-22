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
import { Auth } from 'aws-amplify';
import { axiosInstance } from '../../Resources/Constants';
import axios from 'axios';
import { useForm } from "react-hook-form";
import UserData from '../../Resources/types';
import AuthService from '../../Services/AuthService';

export default function UserProfile() {
    
  const initialValues = {name: '', email: '', bio: ''}
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

  const [user_id, setUserId] = useState<String>('');
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  
  useEffect(() => {
    //fetchUserProfile()
    //signUpandFetch()
    
  }, [])

  const fetchUserProfile = async () => {
    const jwt = await AuthService.SignIn("zebra20", "Nada1998!")
    console.log(jwt)
    
    const response = await UserProfileService.getUserProfile(jwt.response.userSub, jwt.jwt)
    setUserProfile(response.data)
  }

  const signUpandFetch = async () => {
    console.log("fetching")
    const name = "burberry24"
    const email = "burberry24@gmail.com"
    const bio = "listening"

    const data = {name:"burberry24", password:"Nada1998!", email: "burberry24@gmail.com"}
    const returnVal = await AuthService.SignUp(data.name, data.password, data.email)
    //const returnVal = await AuthService.SignIn(data.email, data.password)
    console.log(returnVal)
    console.log("returnVal")
    //const data2 = {name:"burberry16", email: "burberry16@gmail.com", bio: "Listening"}
    

    console.log("add new user to dynamoDB")
    const dater = { name, email, bio }
    
    // UserProfileService.addUserProfile(jwt.newUser, dater)

    console.log("fetch data")
    //console.log(returnVal.response.attributes.sub)
    console.log(returnVal.response.userSub)
    const response = await UserProfileService.getUserProfile(returnVal.response.userSub, returnVal.newUser)
    console.log(response)
    setUserProfile(response.data)
  }

  const onSubmit = handleSubmit(async (data: UserData)=>{
    // UserProfileService.updateUserProfile("f1009b7c-28a6-4248-a9ea-5d7804772775", data)
})

  return (
    <StyledEngineProvider injectFirst>
  <form onSubmit={onSubmit}>   
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
              <Grid container direction={"column"} 
              // component="form" 
              spacing={1}>
                <Grid item>

                  <TextField 
                  {...register("name")}
                  fullWidth
                  id="outlined-basic" 
                  size="small"
                  label="Name"
                  InputLabelProps={{shrink: true}}
                  value={userProfile!.name}
                  onChange={event => {
                    setUserProfile(prevState => {
                      // Object.assign would also work
                      return {...prevState, ['name']: event.target.value};
                    });
                    
                  }}/>
    

                </Grid>
                <Grid item>
                    <TextField fullWidth id="outlined-basic" label="email" 
                    InputLabelProps={{shrink: true}} 
                    value={userProfile!.email} 
                    variant="outlined" size="small" onChange={event => {
                      setUserProfile(prevState => {
                        // Object.assign would also work
                        return {...prevState, ['email']: event.target.value};
                      });
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
              <Grid container direction={"column"} 
              // component="form" 
              spacing={1}>
                <Grid item>
                  <TextField fullWidth
                    id="outlined-multiline"
                    size="medium"
                    label="Bio"
                    value={userProfile!.bio}
                    onChange={event => {
                      setUserProfile(prevState => {
                        // Object.assign would also work
                        return {...prevState, ['bio']: event.target.value};
                      });
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
              <Grid container direction={"column"} 
              // component="form" 
              spacing={1}>
                <Grid item>
                </Grid>     
              </Grid>
            </Box>
          </Paper>        
          <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <Box sx={{my: 2, mr:3}}> 
                <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} variant="contained" 
                //onClick={handleSubmit(onSubmit)}
                onClick={signUpandFetch}
                >Save Profile</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      </form>   
    </StyledEngineProvider>
  );
};