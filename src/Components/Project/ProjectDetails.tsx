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
import { formatDistanceToNowStrict as getTimeDistance } from "date-fns";

const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src =
    "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6";
  event.currentTarget.className = "error";
};
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
  const defaultImage = "https://picsum.photos/200/300";

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

  if (!currentProject) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Box className="Project-details-page">
        <Container>
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
                  image={photoURLs[0] ? photoURLs[0] : defaultImage}
                  onError={imageOnErrorHandler}
                  alt="Project photo"
                />
                <CardContent sx={{ px: 2 }}>
                  <Typography variant="h1" m={1}>
                    {projectName}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <ViewProfile userId={userId}></ViewProfile>
                  </Box>

                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="right"
                    spacing={2}
                    sx={{ my: 4 }}
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

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 1000, mx: 2 }}
                    >
                      Created: {getTimeDistance(new Date(createdAt))} ago
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 1000, mx: 2 }}
                    >
                      Last Updated: {getTimeDistance(new Date(lastUpdatedAt))}{" "}
                      ago
                    </Typography>
                  </Stack>

                  {milestones &&
                    milestones.map((milestone, idx) => {
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
                    <Card sx={{ minWidth: 600, my: 2, boxShadow: 6 }}>
                      <CardContent>
                        <Typography variant="h5" m={3}>
                          Project Description
                        </Typography>
                        <Typography variant="body1" m={3}>
                          {description}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 300, my: 2, boxShadow: 6 }}>
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
                    <Box sx={{ flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Photo Gallery
                      </Typography>
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
                  </Box>
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
