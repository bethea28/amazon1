import { Box, ThemeProvider, Container, Stack, Card, CardContent, CardMedia, Typography, Chip, ImageList, ImageListItem } from '@mui/material';
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

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = "../../Resources/Default_Image_Thumbnail.png";
        event.currentTarget.className = "error";
      };

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
                        <Card sx={{ maxWidth: 1500 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={photoURLs[0]}
                                onError={imageOnErrorHandler}
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
                                <ImageList sx={{ width: 500, height: 164 }} cols={3} rowHeight={164}>
                                {photoURLs.map((url) => (
                                    <ImageListItem key={url}>
                                    <img
                                        src={`${url}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt="Project photo"
                                        onError={imageOnErrorHandler}
                                        loading="lazy"
                                    />
                                    </ImageListItem>
                                ))}
                                </ImageList>
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

function addDefaultSrc(e: any) {
    throw new Error('Function not implemented.');
}
