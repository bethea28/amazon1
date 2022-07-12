import { Container, Box } from "@mui/material";
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
            </Container>
        </Box>
    )
}

export default Dashboard;