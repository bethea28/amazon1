import * as React from 'react';
import { Box } from '@mui/material';
import { Grid, Paper, Button, TextField} from '@mui/material';
import './Profile.css';
import { Dispatch, SetStateAction } from 'react';
import { Component } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';


export default function Profile() {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //value: React.Dispatch<React.SetStateAction<string>>
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 900 }}>
      <Box
        sx={{
          width: 1,
          height: 1 / 4,
          my: 3,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: '5px',
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        Picture
      </Box>
      <Box
        sx={{
          width: 2 / 3,
          height: 1,
          mx: "auto",
          pl: 3,
          py: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'left',
        }}
      >
        <Box sx={{ fontWeight: 'bold'}}>My Profile</Box>

        <Paper elevation={3} sx={{ flexDirection: 'column',
          my: 2, mr: 3,
          height: 1 / 3,
          borderRadius: '5px',
          display: 'flex', 
          backgroundColor: '#EAEAEA'}}>    
            <Box sx={{
              height: 1 / 4,
              width: '100%',
              borderRadius: '5px',
              display: 'flex', 
              backgroundColor: '#335436'}}>
              <Grid item container direction="row" justifyContent="space-between">
              <Box sx={{ml: 2, color: '#FFFFFF', typography: 'subtitle2' }}>Personal Information</Box>
              <Grid item container justifyContent="flex-end" alignItems="flex-end">
              <Box sx={{}}> <Button variant="contained" onClick={handleClick} endIcon={<KeyboardArrowUpIcon />} ></Button>
            </Box>
            </Grid>
            </Grid>
            </Box>
            <Box sx={{ml:2, m: 1, height: 3 / 4}}>
              <Grid container direction={"column"} component="form" spacing={1}>
                <Grid item>
                            <TextField id="outlined-basic" label="Name" variant="outlined" size="small"/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Username" variant="outlined" size="small"/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Email" variant="outlined" size="small"/>
                        </Grid>
                        
                    </Grid>
                    </Box>
        </Paper>

        <Paper elevation={3} sx={{ flexDirection: 'column',
          my: 2, mr: 3,
          height: 1 / 3,
          borderRadius: '5px',
          display: 'flex', 
          backgroundColor: '#EAEAEA'}}>    
            <Box sx={{
              height: 1 / 4,
              width: '100%',
              borderRadius: '5px',
              display: 'flex', 
              backgroundColor: '#335436'}}>   
              
              <Grid item container direction="row" justifyContent="space-between">
              <Box sx={{ml: 2, color: '#FFFFFF', typography: 'subtitle2' }}>Bio</Box>
              <Grid item container justifyContent="flex-end" alignItems="flex-end">
              <Box sx={{}}> <Button variant="contained" onClick={handleClick} endIcon={<KeyboardArrowUpIcon />} ></Button>
            </Box>
             
            </Grid>
            <Box sx={{ml:2, m: 1, height: 3 / 4}}>
              <Grid container direction={"column"} component="form" spacing={1}>
                <Grid item>
                <TextField
          id="outlined-multiline"
          size="medium"
          label="Bio"
          multiline
          rows={5}
        />
                        </Grid>
                        
                     
                        
                    </Grid>
                    </Box>
            
            </Grid>
            
            </Box>
            

        </Paper>

        <Box sx={{
              mr: 3,
              height: 1 / 11,
              borderRadius: '5px',
              display: 'flex', 
              backgroundColor: '#335436'}}>
              <Grid item container direction="row" justifyContent="space-between">
              <Box sx={{ml: 2, color: '#FFFFFF', typography: 'subtitle2' }}>Interest</Box>
              <Grid item container justifyContent="flex-end" alignItems="flex-end">
              <Box sx={{}}> <Button variant="contained" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} ></Button>
            </Box>
            </Grid>
            </Grid>
            </Box>

        {/* { <Paper elevation={3} sx={{ flexDirection: 'column',
          mr: 3,
          height: 1 / 4,
          //borderRadius: '5px',
          display: 'flex', 
          backgroundColor: '#EAEAEA'}}>    
          </Paper> } */}
            <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Box sx={{my: 6}}> <Button variant="contained" onClick={handleClick}>Save Profile</Button></Box></Grid>
      </Box>
    </Box>
  );
}
