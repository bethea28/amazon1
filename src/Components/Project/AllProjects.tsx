import { useState, useEffect, useContext } from "react";
import { Project } from "../../Resources/Constants";
import { getLikedProjects, getMyProjects } from "../../Services/ProjectService";
import CarouselSelection from "../Home/CarouselSection";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../../Context/AuthProvider";

export default function AllProjects()
{
  const {id} = useContext(AuthContext)
  const [likedProjects, setLikedProjects] = useState<Project[]>();
  const [myProjects, setMyProjects] = useState<Project[]>();

  useEffect(() => {
    const fetchLikedProjects = async () => {
      try{
        const response = await getLikedProjects(id) as Project[]
        setLikedProjects(response);
      }catch(err)
      {
        setLikedProjects(undefined)
      }
    }

    const fetchMyProjects = async () => {
      try{
        const response = await getMyProjects(id) as Project[]
        setMyProjects(response);
      }catch(err)
      {
        setMyProjects(undefined)
      }
    }

    fetchMyProjects();
    fetchLikedProjects();

  }, [id])

  return (
    <>
      { likedProjects
        ? <>
          <Box sx={{bgcolor:'#A6BBA7', mb:2}}>
            <Typography variant="h6" fontFamily={'sans-serif'} my={2}>Liked Projects</Typography>
          </Box>
          <CarouselSelection {...likedProjects}/>
        </>

        : <Box marginBottom={4}>
          <Typography variant="h6" fontFamily={'sans-serif'}>No Liked projects</Typography>
        </Box>
      }

      { myProjects
      ? <>
        <Box sx={{bgcolor:'#A6BBA7', mb:2}}>
          <Typography variant="h6" fontFamily={'sans-serif'} my={2} >My Projects</Typography>
        </Box>
        <CarouselSelection {...myProjects}/>
      </>
      : <Box marginBottom={4}>
          <Typography variant="h6" fontFamily={'sans-serif'}>No projects</Typography>
        </Box>
      }
    </>
  )
}