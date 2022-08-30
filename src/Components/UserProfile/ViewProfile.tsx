import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  DialogProps,
} from "@mui/material";
import {
  typographyTitle,
  User,
  initialUserData,
} from "../../Resources/Constants";
import UserService from "../../Services/UserService";

export default function ViewProfile({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [userProfile, setUserProfile] = useState<User>(initialUserData);
  const [maxWidth] = useState<DialogProps["maxWidth"]>("sm");

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = (await UserService.getUser(userId)) as User;
        setUserProfile(response);
      } catch (err) {
        console.log(err);
      }
    }
  };
  if (!userProfile) {
    return null;
  }
  const { firstName, lastName, bio, email, lastSignOn, avatarURL } =
    userProfile;

  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        fontSize={14}
        onClick={handleClickOpen}
        sx={{ ...typographyTitle }}
      >
        {`By: ${firstName} ${lastName}`}
      </Typography>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <img src={avatarURL} />
        <DialogTitle sx={{ justifyContent: "center" }}>
          {firstName + " " + lastName}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Bio: {bio}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Last sign on: {lastSignOn.split(",").at(0)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
