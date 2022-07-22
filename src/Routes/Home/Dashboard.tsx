import { Container, Box, ButtonGroup, Button, Stack, Typography, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { getRecommendedProjects } from "../../Services/ProjectService";
import { Project } from "../../Resources/Constants";
import NavigationBar from "./Components/NavigationBar";
import ProjectList from "./Components/ProjectList";
import SearchBar from "./Components/SearchBar";
import { theme } from "../../Resources/GlobalTheme";

function Dashboard() {

    const [recommended, setRecommended] = useState<Project[]>();

    useEffect(() => {
        const fetchRecommended = async () => {
            const response = await getRecommendedProjects('["Art", "Pet", "Food"]')
            setRecommended(response);
        }

        if (!recommended) {
            fetchRecommended();
        }
    }, [recommended])


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Header />
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    {/* Recommended Projects Carousel */}
                    <Stack>
                        <Stack>
                            <Typography margin={"0.5em"} textAlign={"left"} variant="h4">BASED ON YOUR INTERESTS</Typography>
                            <ProjectList projects={recommended!} />
                        </Stack>
                    </Stack>

                    {/* Trending Projects Component Carousel */}
                    {/* New Projects Component Carousel */}
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