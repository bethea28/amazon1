import { Box, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React from "react";


function ProjectList() {
    return (
        <Box>
            <Carousel navButtonsAlwaysVisible height={"450px"}>
                <Grid container flexWrap={"nowrap"} justifyContent={"space-evenly"}>
                    <Grid item>
                        <img src="https://picsum.photos/250" alt="thumbnail"/>
                        <Typography padding={"1em"} variant="subtitle1" textAlign={"justify"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis conubia nostra, per inceptos himenaeos.</Typography>
                    </Grid>
                    <Grid item>
                        <img src="https://picsum.photos/250" alt="thumbnail"/>
                        <Typography padding={"1em"} variant="subtitle1" textAlign={"justify"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis conubia nostra, per inceptos himenaeos.</Typography>
                    </Grid>
                    <Grid item>
                        <img src="https://picsum.photos/250" alt="thumbnail"/>
                        <Typography padding={"1em"} variant="subtitle1" textAlign={"justify"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis conubia nostra, per inceptos himenaeos.</Typography>
                    </Grid>
                </Grid>
            </Carousel>
        </Box>
    )
}

export default ProjectList;