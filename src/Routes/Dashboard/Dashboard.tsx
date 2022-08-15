import { Container, Box, ButtonGroup, Button, Stack, Typography, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { getNewestProjects, getRecommendedProjects } from "../../Services/ProjectService";
import { Project } from "../../Resources/Constants";
import NavigationBar from "./Components/NavigationBar";
import ProjectList from "./Components/ProjectList";
import SearchBar from "./Components/SearchBar";
import { theme } from "../../Resources/GlobalTheme";

function Dashboard() {

    const [recommended, setRecommended] = useState<Project[]>();
    const [recent, setRecent] = useState<Project[]>();

    // useEffect(() => {
    //     const fetchRecommended = async () => {
    //         const response = await getRecommendedProjects('["art", "pet", "food"]')
    //         setRecommended(response);
    //     }

    //     const fetchNewest = async () => {
    //         const response = await getNewestProjects();
    //         setRecent(response);
    //     }

    //     if (!recommended) {
    //         fetchRecommended();
    //     }

    //     if (!recent) {
    //         fetchNewest();
    //     }
    // }, [recommended])


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    <Stack>
                        <Stack>
                            <Typography margin={"0.5em"} textAlign={"left"} variant="h4">BASED ON YOUR INTERESTS</Typography>
                            <ProjectList projects={recommended!} />
                        </Stack>
                        <Stack>
                            <Typography margin={"0.5em"} textAlign={"left"} variant="h4">NEW PROJECTS</Typography>
                            <ProjectList projects={recent!}/>
                        </Stack>
                    </Stack>
                    {/* Trending Projects Component Carousel */}
                    <ButtonGroup fullWidth>
                        <Button sx={{ marginX: "10px" }} variant="contained">Start a Project</Button>
                        <Button sx={{ marginX: "10px" }} variant="contained">Fund a Project</Button>
                    </ButtonGroup>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Dashboard;