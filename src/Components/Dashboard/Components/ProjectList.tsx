import { Box, Card, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React from "react";
import { GetProjectsResponse } from "../../../Resources/Constants";
import { useNavigate } from "react-router-dom";

function ProjectList(props: GetProjectsResponse) {
  const navigate = useNavigate();

  return (
    <Box>
      <Carousel indicators={false} animation="slide" height={"450px"}>
        {props.projects &&
          props.projects.map((project, idx) => {
            return (
              <Grid
                key={idx}
                container
                flexWrap={"nowrap"}
                justifyContent={"space-evenly"}
              >
                <Grid item>
                  <Card
                    sx={{ padding: "1em" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.cursor = "pointer")
                    }
                    onClick={() => navigate(`/projects/${project.projectId}`)}
                  >
                    <img src="https://picsum.photos/250" alt="thumbnail" />
                    <Typography variant="h4">{project.projectName}</Typography>
                    <Typography
                      padding={"1em"}
                      variant="subtitle1"
                      textAlign={"justify"}
                    >
                      {project.description}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
      </Carousel>
    </Box>
  );
}

export default ProjectList;
