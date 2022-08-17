import logo from '../../logo.svg';
import { Box, Grid, Typography} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserProfileService from '../../Services/UserProfileService';
import UserData from '../../Resources/types';
import { viewProfileAdditional, viewProfileInfo } from '../Constants';

export default function ViewUserProfile(){

  const [value, setValue] = React.useState('1');
  const initialValues = {name: '', email: '', bio: ''}
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const commentsArray = ["Comment #1","Comment #2", "Comment #3"];
  const [userComments, setUserComments] = useState<string[]>([])

  useEffect(() => {
    fetchUserProfile()
    fetchUserComments()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await UserProfileService.getUserProfile("510f359f-3f5b-4675-828a-1590d9db0b6a")
      setUserProfile(response.data)
    }catch (err){
      }
    }
  
  const fetchUserComments = async () => {
    try {
      setUserComments(commentsArray)
    }catch (err){
      }
    }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
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
      </Box>
    </Box>
  )
}










// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog, { DialogProps } from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Switch from '@mui/material/Switch';

// export default function MaxWidthDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value,
//     );
//   };

//   const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFullWidth(event.target.checked);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open max-width dialog
//       </Button>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={open}
//         onClose={handleClose}
//       >
//         <DialogTitle>Optional sizes</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             You can set my maximum width and whether to adapt or not.
//           </DialogContentText>
//           <Box
//             noValidate
//             component="form"
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               m: 'auto',
//               width: 'fit-content',
//             }}
//           >
//             <FormControl sx={{ mt: 2, minWidth: 120 }}>
//               <InputLabel htmlFor="max-width">maxWidth</InputLabel>
//               <Select
//                 autoFocus
//                 value={maxWidth}
//                 onChange={handleMaxWidthChange}
//                 label="maxWidth"
//                 inputProps={{
//                   name: 'max-width',
//                   id: 'max-width',
//                 }}
//               >
//                 <MenuItem value={false as any}>false</MenuItem>
//                 <MenuItem value="xs">xs</MenuItem>
//                 <MenuItem value="sm">sm</MenuItem>
//                 <MenuItem value="md">md</MenuItem>
//                 <MenuItem value="lg">lg</MenuItem>
//                 <MenuItem value="xl">xl</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControlLabel
//               sx={{ mt: 1 }}
//               control={
//                 <Switch checked={fullWidth} onChange={handleFullWidthChange} />
//               }
//               label="Full width"
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
