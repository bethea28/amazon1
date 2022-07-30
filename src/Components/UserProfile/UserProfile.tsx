import React, { useState, useEffect, useContext } from 'react'
import { Box, StyledEngineProvider, Avatar } from '@mui/material';
import { Grid, Paper, Button, TextField} from '@mui/material';
import AppbarPrivate from '../Navbar/AppbarPrivate';
import AppbarPublic from '../Navbar/AppbarPublic';
import "./Styles.css";
import UserProfileService from '../../Services/UserProfileService';
import { profileBackgroundImageBox, profileDataBox } from '../Constants';
import { useForm } from "react-hook-form";
import UserData from '../../Resources/types';
import { AuthContext} from '../../Context/AuthProvider';
import { ProfileSectionStyle } from './UserProfileStyle';
import AuthService from '../../Services/AuthService';

export default function UserProfile() {

  const initialValues = {name: '', email: '', bio: ''}
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const { register, handleSubmit, reset } = useForm<UserData>();
  const { id, token, isLoggedIn, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = await AuthService.getCurrentUser()
      const response = await UserProfileService.getUserProfile(token.id, token.jwt)
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: true}
      })
      setUserProfile(response.data)
     reset(response.data)
    }catch (err){
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: false}
      })
    }

  }

  const onSubmit = handleSubmit(async (data: UserData)=>{
    const response = await UserProfileService.updateUserProfile(id!, token!, data)
})

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={onSubmit}>  
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1000}}>
          {isLoggedIn ? <AppbarPrivate /> : <AppbarPublic />}
          <Box sx={{...profileBackgroundImageBox}}>
            Picture
          </Box>
          <Box sx={{...profileDataBox}}>
            <Box sx={{ fontWeight: 'bold'}}>My Profile</Box>
            <Paper elevation={3} className="customPaper" >    
              <Box className="customBox">
                <ProfileSectionStyle label="Personal Information"></ProfileSectionStyle>
              </Box>
              <Box sx={{ml:2, m: 1, height: 3 / 4}}>
                <Grid container direction={"column"} 
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
                <ProfileSectionStyle label="Bio"></ProfileSectionStyle>
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
                      InputLabelProps={{shrink: true}}
                    />
                  </Grid>     
                </Grid>
              </Box>
            </Paper>
            <Paper elevation={3} className="customPaper">    
              <Box className="customBox">  
                <ProfileSectionStyle label="Interest"></ProfileSectionStyle>
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