import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function NavigationBar() {
    //Checks page width to check for mobile devices
    const matches = useMediaQuery("(min-width: 600px)");
    
    return (
      <></>
        // <Box margin={"1em"}>
        //     <Grid container flexDirection={matches ? "row" : "column"} justifyContent={"space-around"}>
        //         <Grid item>
        //             <Link href="#" color={"inherit"} underline="none">
        //                 <Typography variant="h6">How It Works</Typography>
        //             </Link>
        //         </Grid>
        //         <Grid item>
        //             <Link href="#" color={"inherit"} underline="none">
        //                 <Typography variant="h6">Explore</Typography>
        //             </Link>
        //         </Grid>
        //         <Grid item>
        //             <Link href="#" color={"inherit"} underline="none">
        //                 <Typography variant="h6">Start A Project</Typography>
        //             </Link>
        //         </Grid>
        //         <Grid item>
        //             <Link href="#" color={"inherit"} underline="none">
        //                 <Typography variant="h6">Fund A Project</Typography>
        //             </Link>
        //         </Grid>
        //     </Grid>
        // </Box>
    );
}

export default NavigationBar;