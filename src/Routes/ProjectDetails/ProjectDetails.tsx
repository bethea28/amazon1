import { Box, TextField, Avatar, Button, ThemeProvider, Container } from '@mui/material';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Project, GetProjectsResponse } from '../../Resources/Constants';
import { getProjectDetails } from '../../Services/ProjectService';
import ProjectDetailsList from './Components/ProjectDetailsList';
import { theme } from "../../Resources/GlobalTheme";
import NavigationBar from '../Dashboard/Components/NavigationBar';
import SearchBar from '../Dashboard/Components/SearchBar';
import Header from '../../Components/Header';
import AppbarPrivate from '../../Components/Navbar/AppbarPrivate';
import AppbarPublic from '../../Components/Navbar/AppbarPublic';



export default function ProjectDetails() {

    //Update to refer to specific project clicked on identified by project id
    //useParams or Context to pass in global projectId variable
    const projectId = "f476a834-cfea-4184-8596-d7bfbce50dfd"

    const [currentProject, setCurrentProject] = useState<Project[]>();
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);


    //As soon as the page is rendered, getData function will get called
    useEffect(() => {

        const getData = async () => {

            //Call axios service to fetch data
            const response = await getProjectDetails(projectId);
            setCurrentProject(response!);
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    return (
        <ThemeProvider theme={theme}>
            <Box>
            {userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />}
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    <Box className="Project-details">
                        <ProjectDetailsList projects={currentProject!} />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}