import React from 'react';
import { Grid, Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ProfileSectionStyle (props:{ label:string })
{
  const navigate = useNavigate();
  
  const navigateTo = () => {
    navigate("/interests");
  };
  return (
    <Grid item container direction="row" justifyContent="space-between">
    <Grid item>
      <Box sx={{ml: 1, mt:1, color: '#FFFFFF', typography: 'subtitle2' }}>{props.label}</Box>
    </Grid>
    {props.label == "Interests"
      ? (<Grid item>
        <Box sx={{ml: 2, mr: 1}}>
          <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25}} onClick={navigateTo}  variant="contained"> Change </Button>
        </Box>
      </Grid>)
      : <></>}
  </Grid> 
  )
}