import React, { useState, useEffect } from "react"
import { Typography, Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, DialogProps } from "@mui/material"
import { typographyTitle, Project, User, initialUserData } from "../../Resources/Constants"
import UserService from "../../Services/UserService";

export default function ViewProfile({ userId }: Project) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [userProfile, setUserProfile] = useState<User>(initialUserData);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

  useEffect(() => {
    fetchUserData()
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

  const fetchUserData = async () => {
    try {
      const response = await UserService.getUser(userId) as User;
      setUserProfile(response);
    } catch (err) {
      return err;
    }
  }

  const { firstName, lastName, bio, email, lastSignOn, avatarURL } = userProfile

  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{ ...typographyTitle }}>
        By:
        <Typography variant="h6"
          noWrap
          component="a"
          onClick={handleClickOpen}
          sx={{ textDecoration: 'underline', ...typographyTitle }}>
          {firstName + " " + lastName}
        </Typography>
      </Typography>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}>
        <img src={avatarURL} />
        <DialogTitle sx={{ justifyContent: 'center' }}>
          {firstName + " " + lastName}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Bio: {bio}
          </Typography>
          <Typography>
            Email: {email}
          </Typography>
          <Typography>
            Last sign on: {lastSignOn.split(",").at(0)}
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content'
            }}>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}