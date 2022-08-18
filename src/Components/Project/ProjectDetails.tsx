import { Box, ThemeProvider, Container } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Project } from '../../Resources/Constants';
import { getProjectDetails } from '../../Services/ProjectService';
import ProjectDetailsList from './Components/ProjectDetailsList';
import { theme } from "../../Resources/GlobalTheme";
import NavigationBar from '../Dashboard/Components/NavigationBar';
import SearchBar from '../Dashboard/Components/SearchBar';

export default function ProjectDetails() {

    const projectId = "f476a834-cfea-4184-8596-d7bfbce50dfd" //Update to useParams or Context to pass in global projectId variable
    const [currentProject, setCurrentProject] = useState<Project[]>();
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

    /**
     * onLoad display the current project's details
     */
    useEffect(() => {
        const getData = async () => {
            const response = await getProjectDetails(projectId);
            setCurrentProject(response!);
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    return (
        <ThemeProvider theme={theme}>
            <Box className="Project-details-page">
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    <Box>
                        <ProjectDetailsList projects={currentProject!} />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}