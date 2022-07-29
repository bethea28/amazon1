import logo from '../../logo.svg';
import { Box, Grid, Typography, List, ListItem, 
  ListItemText, Divider} from '@mui/material';
import AppbarPrivate from "../Navbar/AppbarPrivate"
import { viewProfileInfo,viewProfileAdditional } from '../Constants';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ViewUserProfile(){
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
      <ListItem>
        <ListItemText primary="About" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Biography" />
      </ListItem>
    </List>
      </Box>
    </Box>
  )
}