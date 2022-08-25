import { interests } from "../../Resources/Constants";
import { Grid, Typography } from "@mui/material";
import { Divider, Box, Paper } from "@mui/material";
import Caro from './caro';
import { useState, useEffect } from "react";
import { Project, initialProjectData } from "../../Resources/Constants";
import { getRecommendedProjects, getNewestProjects } from "../../Services/ProjectService";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const [recent, setRecent] = useState<Project[]>([initialProjectData]);
  const [recommended, setRecommended] = useState<Project[]>();

  useEffect(() => {
    const fetchRecommended = async () => {
        const response = await getRecommendedProjects('["art", "pet", "food"]')
        setRecommended(response);
    }

    const fetchNewest = async () => {
        const response = await getNewestProjects();
        console.log("recent: ", recent)
        setRecent(response!);
    }

    if (!recommended) {
        fetchRecommended();
    }

    if (!recent) {
        fetchNewest();
    }
    fetchNewest()
}, [recommended])

  return (
    <>
    <Box>
      <Grid container columnSpacing={2} justifyContent={'space-evenly'} 
      marginTop={3} marginBottom={3}>
        {interests.map((interest, idx) => <Grid item key={idx}>
          <Typography variant="subtitle1" fontWeight={0} fontSize={20} lineHeight={2} fontFamily={'sans-serif'}>
          {interest}
          </Typography>
          </Grid>)}
      </Grid>
      <Divider/>
      <Box sx={{my:5}}>
      <Typography variant="subtitle1" fontWeight={0} fontSize={40} fontFamily={'sans-serif'}>
        Bring a creative project to life.
      </Typography>
      </Box>
      <Box sx={{mb:5}}>
      <Typography variant="h6" fontWeight={0} fontSize={15} fontFamily={'sans-serif'}>
        On Jumpstarter:
      </Typography>
      <Box sx={{
          justifyContent: 'center', alignItems: 'center',
          alignContent: 'center', display:'inline-block'}}>
      <Paper
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          mb: 4,
          mt: 2,
          // width: 'fit-content',
          width: 400,
          height: 50,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        {/* <FormatAlignLeftIcon /> */}
        # Projects funded
        <Divider orientation="vertical" flexItem />
        {/* <FormatBoldIcon /> */}
        $ towards creative work
      </Paper>
      </Box>
      </Box>
      {/* <Dashboard/> */}
      {/* <Caro {...recent}/> */}
      <Caro {...recent}/>
      </Box>
    </>
  )
}

export default Home