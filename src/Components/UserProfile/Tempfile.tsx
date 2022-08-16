import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../../logo.svg';
import { Typography } from '@mui/material';
import { typographyTitle } from '../Constants';

export default function Tempfile() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

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
        <DialogTitle sx={{justifyContent: 'center' }}>User's name</DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{...typographyTitle}}
          >
            Add user bio here 
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
