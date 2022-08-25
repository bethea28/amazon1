import { interests } from "../../Resources/Constants";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
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
      <Grid container columnSpacing={2} justifyContent={'space-evenly'} 
      marginTop={3} marginBottom={3}>
        {interests.map((interest, idx) => <Grid item key={idx}>
          {interest}
          </Grid>)}
      </Grid>
      <Divider/>
      {/* <Dashboard/> */}
      {/* <Caro {...recent}/> */}
      <Caro {...recent}/>
    </>
  )
}

export default Home