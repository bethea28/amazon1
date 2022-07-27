import React from 'react';
import { Grid, Box, Button} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function ProfileSectionStyle (props:{ label:string })
{
  return (
    <Grid item container direction="row" justifyContent="space-between">
    <Grid item>
      <Box sx={{ml: 1, mt:1, color: '#FFFFFF', typography: 'subtitle2' }}>{props.label}</Box>
    </Grid>
    <Grid item>
      <Box sx={{ml: 2, mr: 1}}>
        <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25,  }}  variant="contained" endIcon={<KeyboardArrowUpIcon />}></Button>
      </Box>
    </Grid>
  </Grid> 
  )
}