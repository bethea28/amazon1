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
import { setConstantValue } from 'typescript';

export default function UserProfile() {
    
  let token = ''
  let idSub = ''
  const initialValues = {name: '', email: '', bio: ''}
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserData>();

  const [user_id, setUserId] = useState<String>('');
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  
  useEffect(() => {
    fetchUserProfile()
    
  }, [])

  const fetchUserProfile = async () => {
    console.log("Called fetchUserProfile()")
    const jwt = await AuthService.SignIn("zebra21", "Nada1998!")
    const id = jwt.response.attributes.sub
    token = jwt.jwt
    idSub = id
    const response = await UserProfileService.getUserProfile(id, jwt.jwt)
    setUserProfile(response.data)
    reset(response.data)
  }

  const onSubmit = handleSubmit(async (data: UserData)=>{
    console.log("submit")
    const jwt = await AuthService.SignIn("zebra21", "Nada1998!")
    const id = jwt.response.attributes.sub
    console.log(data)
    console.log(`jwt: ${jwt.jwt}`)
    
    const response = await UserProfileService.updateUserProfile(id, jwt.jwt, data)

})

// const onSubmit = handleSubmit(data => console.log(data));

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

                  <TextField type="text"
                  {...register('name', {
                    onChange: (event: React.ChangeEvent<HTMLInputElement>): 
                    void => {setUserProfile((prevState) => ({ 
                      name: event.target.value,
                      email: prevState.email,
                      bio: prevState.bio
                   }))
                  }
                })}
                  fullWidth
                  id="outlined-basic" 
                  size="small"
                  label="Name"
                  InputLabelProps={{shrink: true}}
                  value={userProfile!.name}
                  // onChange={event => {
                  //   setUserProfile(prevState => {
                  //     return {['name']: event.target.value};
                  //   });
                    
                  // }}
                  />
    

                </Grid>
                <Grid item>
                    <TextField {...register('email')}
                    onChange={event => {
                      setUserProfile(prevState => {
                        // Object.assign would also work
                        return {...prevState, ['email']: event.target.value};
                      });
                    }}
                    fullWidth id="outlined-basic" label="email" 
                    InputLabelProps={{shrink: true}} 
                    value={userProfile!.email} 
                    variant="outlined" size="small" 
                    />
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
                  <TextField {...register('bio')}
                  fullWidth
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
                onClick={onSubmit}
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