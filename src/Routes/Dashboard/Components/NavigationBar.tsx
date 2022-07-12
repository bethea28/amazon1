import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";

function NavigationBar() {
    return (
        <Box margin={"1em"}>
            <Grid container justifyContent={"space-around"}>
                <Grid item>
                    <Link href="#" color={"inherit"} underline="none">
                        <Typography>How It Works</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" color={"inherit"} underline="none">
                        <Typography>Explore</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" color={"inherit"} underline="none">
                        <Typography>Start A Project</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" color={"inherit"} underline="none">
                        <Typography>Fund A Project</Typography>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default NavigationBar;