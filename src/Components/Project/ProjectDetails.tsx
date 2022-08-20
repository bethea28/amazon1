import { Box, ThemeProvider, Container, Stack, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Project } from '../../Resources/Constants';
import { getProjectDetails } from '../../Services/ProjectService';
import { theme } from "../../Resources/GlobalTheme";
import NavigationBar from '../Dashboard/Components/NavigationBar';
import SearchBar from '../Dashboard/Components/SearchBar';
import AppbarPrivate from '../Navbar/AppbarPrivate';
import AppbarPublic from '../Navbar/AppbarPublic';
import { loadingOverlay } from 'aws-amplify';

export default function ProjectDetails() {

    const projectId = "f6ecfc49-01bb-4d8c-bfab-454b2c820521" //Update to useParams or Context to pass in global projectId variable
    const [currentProject, setCurrentProject] = useState<Project>();
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

    /**
     * onLoad display the current project's details
     */
    useEffect(() => {
        const getData = async () => {
            const response = await getProjectDetails(projectId);
            setCurrentProject(response);
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    return (
        <ThemeProvider theme={theme}>
            {currentProject && <Box className="Project-details-page">
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    <Box>
                        <Stack 
                            key={currentProject!.projectId}
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={2}
                            m={5}
                        >
                        <Card sx={{ maxWidth: 1000 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg"
                                alt="Pot of plants"
                            />
                            {/* Update Image to project photos prop */}
                            <CardContent>
                                <Typography variant="h1" m={1}>
                                {currentProject!.projectName}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                    >
                                    <Chip label={currentProject!.categories} sx={{backgroundColor: 'rgb(166, 223, 139)' }}/>
                                    <Typography variant="subtitle1" m={3}>
                                    <Typography sx={{ fontWeight: 1000 }}>Created:</Typography> {currentProject!.createdAt} <Typography sx={{ fontWeight: 1000 }}>Last Updated:</Typography> {currentProject!.lastUpdatedAt}
                                    </Typography>
                                </Stack>
                                {/* Insert targetFundingDate and targetFundingNum component here
                                Insert user data (avatar and name) component */}
                                <Typography variant="body1" m={3}>
                                {currentProject!.description}
                                </Typography>
                            </CardContent>
                            {/* Insert like component
                            Insert comments component */}
                        </Card>
                        </Stack>
                    </Box>

                </Container>
            </Box>}
        </ThemeProvider>
    )
}