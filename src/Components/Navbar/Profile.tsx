import * as React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import { Grid } from '@mui/material';
import { Button, Paper } from '@mui/material';
import './Profile.css';

export default function Profile() {
    return (
        <Box sx={{flexDirection: 'column', alignItems: 'flex-start', height: 300}}>
            <Box sx={{ 
                m: 1,
                display: 'flex', 
                border: '1px solid',
                height: '50%',
                backgroundColor: 'primary.dark'}}>
            <h1>Header Picture</h1>
            </Box>
            <Paper elevation={1}
            sx={{ flexDirection: 'column',
                m:8,
                p: 1,
                height: 600,
                borderRadius: '10px',
                display: 'flex', 
                border: '1px solid',
                backgroundColor: '#EAEAEA'}}>
                <Typography variant="subtitle1">My profile</Typography>
                <Box sx={{ flexDirection: 'column',
                    m:3,
                    height: '33%',
                    width: '90%',
                    borderRadius: '5px',
                    display: 'flex', 
                    border: '1px solid',
                    backgroundColor: '#EAEAEA'}}>
                    <Box sx={{
                        height: '33%',
                        width: '100%',
                        borderRadius: '5px',
                        display: 'flex', 
                        backgroundColor: '#335436'}}>
                        <Typography variant="subtitle1">Personal information</Typography>
                    </Box>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <TextField id="outlined-basic" label="Name" variant="outlined" size="small"/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Username" variant="outlined" size="small"/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexDirection: 'column',
                    m:3,
                    p: 1,
                    height: '33%',
                    width: '90%',
                    borderRadius: '10px',
                    display: 'flex', 
                    border: '2px solid',
                    backgroundColor: '#EAEAEA'}}>  
                    <Box sx={{
                        height: '33%',
                        width: '100%',
                        borderRadius: '5px',
                        display: 'flex', 
                        backgroundColor: '#335436'}}>
                        <Typography variant="subtitle1">Bio</Typography>
                    </Box>
                    <TextField id="outlined-basic" label="Bio" variant="outlined"/>
                </Box>
                <Box sx={{ 
                    m:3,
                    p: 1,
                    height: '33%',
                    width: '90%',
                    borderRadius: '10px',
                    display: 'flex', 
                    border: '2px solid',
                    backgroundColor: '#EAEAEA'}}>
                    <Box sx={{
                        height: '33%',
                        width: '100%',
                        borderRadius: '5px',
                        display: 'flex', 
                        backgroundColor: '#335436'}}>
                        <Typography variant="subtitle1">Interest</Typography>
                    </Box>
                </Box>
                <Button className="Button" variant="contained">Save Profile</Button>
            </Paper>
        </Box>  
    )
}