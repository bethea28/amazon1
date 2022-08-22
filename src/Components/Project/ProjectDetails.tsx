import { Box, ThemeProvider, Container, Stack, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Project } from '../../Resources/Constants';
import { getProjectDetails } from '../../Services/ProjectService';
import { theme } from "../../Resources/GlobalTheme";
import NavigationBar from '../Dashboard/Components/NavigationBar';
import SearchBar from '../Dashboard/Components/SearchBar';
import { loadingOverlay } from 'aws-amplify';
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {

    const { id } = useParams(); //Update to useParams or Context to pass in global projectId variable
    const [currentProject, setCurrentProject] = useState<Project>();
    const { projectId, projectName, photoURLs, categories, lastUpdatedAt, createdAt, description } = currentProject! || {};

    /**
     * onLoad display the current project's details
     */
    useEffect(() => {
        const getData = async () => {
            const response = await getProjectDetails(id!);
            setCurrentProject(response);
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    if (!currentProject) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className="Project-details-page">
                <Container>
                    <SearchBar />
                    <NavigationBar />
                    <Box>
                        <Stack 
                            key={projectId}
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
                                image={photoURLs[0] || "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"}
                                alt="Pot of plants"
                            />
                            <CardContent>
                                <Typography variant="h1" m={1}>
                                {projectName}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                    >
                                    <Chip label={categories} sx={{backgroundColor: 'rgb(166, 223, 139)' }}/>
                                    <Typography variant="subtitle1" m={3}>
                                    <Typography sx={{ fontWeight: 1000 }}>Created:</Typography> {createdAt} <Typography sx={{ fontWeight: 1000 }}>Last Updated:</Typography> {lastUpdatedAt}
                                    </Typography>
                                </Stack>
                                {/* Insert targetFundingDate and targetFundingNum component here
                                Insert user data (avatar and name) component */}
                                <Typography variant="body1" m={3}>
                                {description}
                                </Typography>
                            </CardContent>
                            {/* Insert like component
                            Insert comments component */}
                        </Card>
                        </Stack>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    )
}