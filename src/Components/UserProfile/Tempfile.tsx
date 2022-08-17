import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../../logo.svg';
import { Typography } from '@mui/material';
import { typographyTitle } from '../Constants';
import UserData from '../../Resources/types';
import UserProfileService from '../../Services/UserProfileService';

export default function Tempfile() {
  const [open, setOpen] = React.useState(false);
  const initialValues = {name: '', email: '', bio: ''}
  const [fullWidth, setFullWidth] = React.useState(true);
  const [userProfile, setUserProfile] = useState<UserData>(initialValues)
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await UserProfileService.getUserProfile("510f359f-3f5b-4675-828a-1590d9db0b6a")
      setUserProfile(response.data)
      console.log("data", response.data)
    }catch (err){
      }
    }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View User Profile
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <DialogTitle sx={{justifyContent: 'center' }}>{userProfile.name}</DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{...typographyTitle}}
          >
            {userProfile.bio} 
          </Typography>
          <Typography>
          Add some more information here
          </Typography>
            
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
