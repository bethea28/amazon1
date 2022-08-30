import {
  Box,
  ThemeProvider,
  Container,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Project } from "../../Resources/Constants";
import { getProjectDetails } from "../../Services/ProjectService";
import { theme } from "../../Resources/GlobalTheme";
import NavigationBar from "../Dashboard/Components/NavigationBar";
import SearchBar from "../Dashboard/Components/SearchBar";
import { useParams, useNavigate } from "react-router-dom";
import ViewProfile from "../UserProfile/ViewProfile";
import CommentList from "../Comments/CommentList";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState<Project>();
  const {
    projectId,
    projectName,
    photoURLs,
    categories,
    lastUpdatedAt,
    createdAt,
    description,
    userId,
    milestones,
    totalFundedNum,
    targetFundingDate,
    targetFundingNum,
  } = currentProject! || {};

  /**
   * onLoad display the current project's details
   */
  useEffect(() => {
    const getData = async () => {
      const response = await getProjectDetails(id!);
      setCurrentProject(response);
    };

    if (!currentProject) {
      getData();
    }
  }, [currentProject]);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6";
    event.currentTarget.className = "error";
  };

  if (!currentProject) {
    return null;
  }
  //console.log("milestones", milestones[0].name);
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
                  width="800"
                  image={photoURLs[0]}
                  onError={imageOnErrorHandler}
                  alt="Project photo"
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
                    <Stack direction="row">
                      <Typography
                        sx={{ fontWeight: 1000, mx: 2 }}
                        variant="subtitle1"
                      >
                        Category:
                      </Typography>
                      <Chip
                        label={categories}
                        sx={{ backgroundColor: "#A6BBA7" }}
                      />
                    </Stack>

                    <Typography variant="subtitle1" m={3}>
                      <Typography sx={{ fontWeight: 1000 }}>
                        Created:
                      </Typography>{" "}
                      {createdAt}{" "}
                      <Typography sx={{ fontWeight: 1000 }}>
                        Last Updated:
                      </Typography>{" "}
                      {lastUpdatedAt}
                    </Typography>
                  </Stack>

                  {/* Insert targetFundingDate and targetFundingNum component here
                                Insert user data (avatar and name) component */}

                  {milestones.map((milestone, idx) => {
                    return (
                      <Card
                        sx={{
                          maxWidth: 1500,
                          my: 2,
                          backgroundColor: "#E9E9E9",
                        }}
                      >
                        <CardContent>
                          <Stack
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography key={idx} variant="body1" m={3}>
                              Milestone {idx + 1}:
                            </Typography>
                            <Typography variant="body1" m={3}>
                              Milestones Name: {milestone.name}
                            </Typography>
                            <Typography variant="body1" m={3}>
                              Milestones Target Amount: ${milestone.amount}
                            </Typography>
                            <Typography variant="body1" m={3}>
                              Milestones Date: {milestone.targetDate}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    );
                  })}
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                  >
                    <Card sx={{ minWidth: 600, my: 2 }}>
                      <CardContent>
                        <Typography variant="h5" m={3}>
                          Project Description
                        </Typography>
                        <Typography variant="body1" m={3}>
                          {description}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 300, my: 2 }}>
                      <CardContent>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="center"
                          spacing={2}
                        >
                          <Typography variant="body1">
                            Current Funding Amount: ${totalFundedNum}
                          </Typography>
                          <Typography variant="body1">
                            Target Funding Amount: ${targetFundingNum}
                          </Typography>
                          <Typography variant="body1">
                            Target Funding Date: {targetFundingDate}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() =>
                              navigate(`/addtransactions/${projectId}`)
                            }
                          >
                            Fund
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ImageList
                      sx={{ width: 500, height: 164 }}
                      cols={3}
                      rowHeight={164}
                    >
                      {photoURLs.slice(1).map((url) => (
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
                  </Box>
                  <ViewProfile userId={userId}></ViewProfile>
                </CardContent>
                {/* Insert like component
                            Insert comments component */}
                <CommentList />
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function addDefaultSrc(e: any) {
  throw new Error("Function not implemented.");
}
