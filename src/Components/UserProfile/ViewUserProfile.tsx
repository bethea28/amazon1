import logo from '../../logo.svg';
import { Box, Grid, Typography, List, ListItem, 
  ListItemText, Divider, Stack, Chip, Button} from '@mui/material';
import AppbarPrivate from "../Navbar/AppbarPrivate";
import { viewProfileInfo,viewProfileAdditional } from '../Constants';
import { useState } from 'react';


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ViewUserProfile(){

  const [style, setStyle] = useState("cont");
  
  const changeStyle = () => {
    console.log("you just clicked");
  
    setStyle("cont2");
  };

  const showAbout = () => {
    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1000}}>
      { <AppbarPrivate /> }
      <Box sx={{...viewProfileInfo}}>
        <Box sx={{display: 'flex', justifyContent: 'center', 
        backgroundColor: "#f5f0f0", width: '50%', height: '75%'}}>
            <Grid item container direction="column" justifyContent="center" alignItems="center">
              <Grid item>
                <img src={logo} className="App-logo" alt="logo" />
              </Grid>
              <Grid item alignItems="center">
                <Typography variant='h4' align='center' style={{ fontWeight: 600 }}>
                  User's Name
                </Typography>
              </Grid>
            </Grid>
        </Box>
      </Box>
      <Box sx={{...viewProfileAdditional}}>
      <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <ListItem alignItems="center" >
        <Stack direction="row" spacing={1} alignContent='center' justifyContent="center" alignItems="center">
          <Chip label="About " onClick={showAbout}/>
          <Chip color="primary" label="Comments" />
          <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} variant="contained"></Button>
        </Stack>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Biography" />
      </ListItem>
    </List>
      </Box>
      {/* <div className="App">CHANGE CSS STYLING WITH ONCLICK EVENT</div>
      <div className={style}>
        <button className="button" onClick={changeStyle}>
          Click me!
        </button>
      </div> */}
    </Box>
  )
}