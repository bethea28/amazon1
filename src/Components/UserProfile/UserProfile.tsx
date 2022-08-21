import React, { useState, useEffect, useContext } from 'react'
import { Box, StyledEngineProvider, Avatar } from '@mui/material';
import { Grid, Paper, Button, TextField} from '@mui/material';
import "./Styles.css";
import UserService from '../../Services/UserService';
import { profileBackgroundImageBox, profileDataBox, User, initialUserData } from '../../Resources/Constants';
import { useForm } from "react-hook-form";
import { AuthContext} from '../../Context/AuthProvider';
import { ProfileSectionStyle } from './UserProfileStyle';
import AuthService from '../../Services/Authentication/AuthService';

export default function UserProfile() {

  const [userProfile, setUserProfile] = useState<User>(initialUserData)
  const { register, handleSubmit, reset } = useForm<User>();
  const { id, token, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser()
      console.log(currentUser.userId)
      const response = await UserService.getUser(currentUser.userId)
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: true, ['id']:currentUser.userId, ['token']:currentUser.jwt}
      })
      console.log("response: ", response)
      console.log("response data: ", response!.data)
      setUserProfile(response!.data)
      reset(response!.data)
    }catch (err){
      setAuthData(prevState => {
        return {...prevState, ['isLoggedIn']: false, ['token']: ''}
      })
    }

  }

  const onSubmit = handleSubmit(async (data: User)=>{
    const response = await UserService.updateUser(id!, token!, data)
})

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={onSubmit}>  
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1000}}>
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
                    <TextField disabled type="text"
                    {...register('firstName', {
                      onChange: (event: React.ChangeEvent<HTMLInputElement>): 
                      void => {setUserProfile((prevState) => ({...prevState,
                        firstName: event.target.value,
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
                    value={userProfile!.firstName}
                    />
                  </Grid>
                  <Grid item>
                      <TextField disabled {...register('email')}
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
                <ProfileSectionStyle label="Interests"></ProfileSectionStyle>
              </Box>
              <Box sx={{m:1, height: 3 / 4}}>
             
                <Grid container spacing= {2} >
                { userProfile.interests
                  ? userProfile.interests.map((interest) =>
                  <Grid key={interest} item>
                  <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} variant="contained"
                  >{interest}</Button>
                  </Grid>)
                  : <></>}
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