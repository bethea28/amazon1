import { Box, Card, CardContent, CardMedia, Chip, Stack, Typography, Link } from "@mui/material";
import { GetProjectsResponse } from "../../../Resources/Constants";
import { typographyTitle } from "../../UserProfile/Constants";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../../../logo.svg';

export default function ProjectDetailsList(props: GetProjectsResponse) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
  const [userData, setUserData] = useState<String>('');

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
    props.projects && props.projects.map((project) => {
      setUserData(project.userId)
    })
  }

  return (
    <Box className="Project-details-list">
      {props.projects && props.projects.map((project) => {
        return (
          <Stack 
            key={project.projectId}
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            m={5}>
            <Card sx={{ maxWidth: 1000 }}>
              <CardMedia
                component="img"
                height="500"
                image="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg"
                alt="Pot of plants"/>
              {/* Update Image to project photos prop */}
              <CardContent>
                <Typography variant="h1" m={1}>
                  {project.projectName}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}>
                  <Chip label={project.categories} sx={{backgroundColor: 'rgb(166, 223, 139)' }}/>
                  <Typography variant="subtitle1" m={3}>
                    <Typography sx={{ fontWeight: 1000 }}>Created:</Typography> {project.createdAt} <Typography sx={{ fontWeight: 1000 }}>Last Updated:</Typography> {project.lastUpdatedAt}
                  </Typography>
                </Stack>
                {/* Insert targetFundingDate and targetFundingNum component here
                  Insert user data (avatar and name) component */}
                <Typography variant="body1" m={3}>
                {project.description}
                </Typography>
                <Typography variant="body1" m={3}>
                {project.description}
                </Typography>

                <React.Fragment>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={handleClickOpen}
                    sx={{...typographyTitle}}>
                      By: 
                      <Link href="#" underline="hover">
                        {userData}
                      </Link>
                  </Typography>                                 
                  <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <DialogTitle sx={{justifyContent: 'center' }}>{project.userId}</DialogTitle>
                    <DialogContent dividers>
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{...typographyTitle}}>
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
                        width: 'fit-content'}}>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </CardContent>
              {/* Insert like component
              Insert comments component */}
            </Card>
          </Stack>
        )
      })}
    </Box>
  )
}