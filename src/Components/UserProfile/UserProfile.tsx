import React, { useState, useEffect, useContext } from 'react'
import { Box, StyledEngineProvider, Avatar } from '@mui/material';
import { Grid, Paper, Button, TextField} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AppbarPrivate from '../Navbar/AppbarPrivate';
import AppbarPublic from '../Navbar/AppbarPublic';
import "./Styles.css";
import UserProfileService from '../../Services/UserProfileService';
import { headerBox, bottomOutterBox } from '../Constants';
import { useForm } from "react-hook-form";
import UserData from '../../Resources/types';
import setAuthorizationToken from '../../Services/SetAuthorizationToken';
import { AuthContext, AuthProvider, AuthData } from '../../Context/AuthProvider';

export default function UserProfile() {
    
  const initialValues = {name: '', email: '', bio: ''}
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const { register, handleSubmit, reset } = useForm<UserData>();

  const [user_id, setUserId] = useState<String>('');
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  
  //get user context
  const { id, token, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    const response = await UserProfileService.getUserProfile(id, token)
    setUserProfile(response.data)
    reset(response.data)
  }

  const onSubmit = handleSubmit(async (data: UserData)=>{
    const response = await UserProfileService.updateUserProfile(id, token, data)

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
                  />
                </Grid>
                <Grid item>
                    <TextField {...register('email')}
                    onChange={event => {
                      setUserProfile(prevState => {
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
                        return {...prevState, ['bio']: event.target.value};
                      });
                  }}
                  multiline={false}
                  // rows={4}
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