import { Box, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React, { useEffect, useState } from "react";
import { GetProjectsResponse } from "../../../Resources/Constants";


function ProjectList(props: GetProjectsResponse) {

    return (
        <Box>
            <Carousel
            indicators={false}
            animation="slide"
            height={"450px"}>
                 {props.projects && props.projects.map((project, idx) => {
                    return (
                        <Grid key={idx} container flexWrap={"nowrap"} justifyContent={"space-evenly"}>
                            <Grid item>
                                <img src="https://picsum.photos/250" alt="thumbnail"/>
                                <Typography padding={"1em"} variant="subtitle1" textAlign={"justify"}>{project.description}</Typography>
                            </Grid>
                        </Grid>
                    )
                 })}
            </Carousel>
        </Box>
    )
}

export default ProjectList;