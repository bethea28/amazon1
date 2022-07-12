import { Container, Box, ButtonGroup, Button } from "@mui/material";
import React from "react";
import Header from "../../Components/Header";
import NavigationBar from "./Components/NavigationBar";
import SearchBar from "./Components/SearchBar";

function Dashboard() {
    return (
        <Box>
            <Header/>
            <Container>
                <SearchBar/>
                <NavigationBar/>
                {/* Recommended Projects Carousel */}
                {/* Trending Projects Component Carousel */}
                {/* New Projects Component Carousel */}
                <ButtonGroup fullWidth>
                    <Button sx={{marginX: "10px"}} variant="contained">Start a Project</Button>
                    <Button sx={{marginX: "10px"}} variant="contained">Fund a Project</Button>
                </ButtonGroup>
            </Container>
        </Box>
    )
}

export default Dashboard;