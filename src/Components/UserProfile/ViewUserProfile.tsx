import logo from '../../logo.svg';
import { Box, Grid, Typography, List, ListItem, 
  ListItemText, Divider, Stack, Chip, Button} from '@mui/material';
import AppbarPrivate from "../Navbar/AppbarPrivate";
// import { viewProfileAdditional } from '../Constants';
// import { viewProfileInfo } from '../Constants';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AuthService from '../../Services/Authentication/AuthService';
import UserProfileService from '../../Services/UserProfileService';
import UserData from '../../Resources/types';

export default function ViewUserProfile(){

  // const [value, setValue] = React.useState('1');
  // const initialValues = {name: '', email: '', bio: ''}
  // const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  // const commentsArray = ["Comment #1","Comment #2", "Comment #3"];
  // const [userComments, setUserComments] = useState<string[]>([])

  // useEffect(() => {
  //   fetchUserProfile()
  //   fetchUserComments()
  // }, [])

  // const fetchUserProfile = async () => {
  //   try {
  //     const token = await AuthService.getCurrentUser()
  //     const response = await UserProfileService.getUserProfile(token.id, token.jwt)
  //     setUserProfile(response.data)
  //   }catch (err){
  //     }
  //   }
  
  // const fetchUserComments = async () => {
  //   try {
  //     const token = await AuthService.getCurrentUser()
  //     setUserComments(commentsArray)
  //   }catch (err){
  //     }
  //   }

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      {/* { <AppbarPrivate /> }
      <Box sx={{...viewProfileInfo}}>
        <Box sx={{display: 'flex', justifyContent: 'center', backgroundColor: "#f5f0f0"}}>
          <Grid item container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
              <img src={logo} className="App-logo" alt="logo" />
            </Grid>
            <Grid item alignItems="center">
              <Typography variant='h4' align='center' style={{ fontWeight: 500 }}>
                {userProfile.name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{...viewProfileAdditional}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="About" value="1" />
                <Tab label="Comments" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {userProfile.bio}
            </TabPanel>
            <TabPanel value="2">
              {userComments.map(function(comment, index){
                return <Box key={index} sx={{width: 1}}> 
                  <Grid item container direction="column" justifyContent="space-between" alignItems="flex-start">
                    <Grid item sx={{width: 1, my: 2}}>
                      <Box sx={{display: "flex", backgroundColor:"#D3D3D3", height: 100, borderRadius:3, mr:3}}>
                        <Typography variant='h4' style={{marginLeft:20}}>
                          {comment}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              })}
            </TabPanel>
          </TabContext>
        </Box>
      </Box> */}
    </Box>
  )
}