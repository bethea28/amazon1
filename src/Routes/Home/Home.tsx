import { Container, Box, ButtonGroup, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Header from "../../Components/Header";
import NavigationBar from "./Components/NavigationBar";
import ProjectList from "./Components/ProjectList";
import SearchBar from "./Components/SearchBar";

function Home() {
    return (
        <Box>
            <Header />
            <Container>
                <SearchBar />
                <NavigationBar />
                {/* Recommended Projects Carousel */}
                <Stack>
                    <Stack>
                        <Typography margin={"0.5em"} textAlign={"left"} variant="h4">BASED ON YOUR INTERESTS</Typography>
                        <ProjectList />
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
    )
}

export default Home;