import { useState, useEffect, useContext } from "react";
import { Project } from "../../Resources/constants";
import { getLikedProjects, getMyProjects } from "../../Services/ProjectService";
import CarouselSelection from "../Home/CarouselSection";
import { Typography, Box, Button, Grid, CircularProgress } from "@mui/material";
import { AuthContext } from "../../Context/AuthProvider";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";

export default function AllProjects() {
  const { id } = useContext(AuthContext);
  const [isLoadingLiked, setIsLoadingLiked] = useState(true);
  const [isLoadingCreated, setIsLoadingCreated] = useState(true);
  const [likedProjects, setLikedProjects] = useState<Project[]>();
  const [myProjects, setMyProjects] = useState<Project[]>();

  useEffect(() => {
    const fetchLikedProjects = async () => {
      try {
        const response = (await getLikedProjects(id)) as Project[];
        setLikedProjects(response);
      } catch (err) {
        setLikedProjects(undefined);
      } finally {
        setIsLoadingLiked(false);
      }
    };

    const fetchMyProjects = async () => {
      try {
        const response = (await getMyProjects(id)) as Project[];
        setMyProjects(response);
      } catch (err) {
        setMyProjects(undefined);
      } finally {
        setIsLoadingCreated(false);
      }
    };

    fetchMyProjects();
    fetchLikedProjects();
  }, [id]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addproject");
  };

  return (
    <>
      {isLoadingLiked ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : likedProjects && likedProjects?.length > 1 ? (
        <>
          <Box sx={{ bgcolor: "#A6BBA7", mb: 2 }}>
            <Typography variant="h6" my={2}>
              Liked Projects
            </Typography>
          </Box>
          <CarouselSelection projects={likedProjects} />
        </>
      ) : (
        <Box marginBottom={4}>
          <Typography variant="h6">No Liked projects</Typography>
        </Box>
      )}

      {isLoadingCreated ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : myProjects ? (
        <>
          <Grid
            container
            direction={"row"}
            sx={{ bgcolor: "#A6BBA7", mb: 2 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h6" my={2}>
                {" "}
                My Projects{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClick}
                endIcon={<PostAddIcon sx={{ fontSize: 40 }} />}
              ></Button>
            </Grid>
          </Grid>
          <CarouselSelection projects={myProjects} />
        </>
      ) : (
        <Box marginBottom={4}>
          <Typography variant="h6"> No projects </Typography>
        </Box>
      )}
    </>
  );
}
