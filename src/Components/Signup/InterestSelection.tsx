import { ToggleButton, Grid, Typography, ToggleButtonGroup, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Header from "../Header";

function InterestSelection() {

    const [choices, setChoices] = useState(() => [""]);

    const ChoiceToggleButton = styled(ToggleButton)({
        backgroundColor: "rgba(144, 216, 111, 0.57)",
        width: "8rem",
        fontWeight: 600,
        borderRadius: "50px!important",
    })

    function handleChoice(event: React.MouseEvent<HTMLElement>, newChoices: string[]) {
        console.log(event);
        setChoices(newChoices);
    }


    return (
        <Box flex={1} overflow={"auto"}>
            <Header />
            <Grid container spacing={0} alignItems="center" height={"100%"}>
                <Grid container xs={4} bgcolor="rgba(209, 225, 210, 0.32)" height={"inherit"} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant="h4">Let's Get Started</Typography>
                    </Grid>
                </Grid>
                <Grid container height={"100%"} xs={8} alignContent={"space-around"} justifyContent={"center"}>
                    <Grid item>
                        <Box>
                            <Typography variant="h5">Select what best describes your interests</Typography>
                            <Typography variant="h5">(Select all that apply)</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box>
                            <ToggleButtonGroup size="large" value={choices} onChange={handleChoice} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
                                <ChoiceToggleButton value="music">Music</ChoiceToggleButton>
                                <ChoiceToggleButton value="art">Art</ChoiceToggleButton>
                                <ChoiceToggleButton value="food"> Food</ChoiceToggleButton>
                                <ChoiceToggleButton value="cars">Cars</ChoiceToggleButton>
                                <ChoiceToggleButton value="wildlife">Wildlife</ChoiceToggleButton>
                                <ChoiceToggleButton value="pets">Pets</ChoiceToggleButton>
                                <ChoiceToggleButton value="technology">Technology</ChoiceToggleButton>
                                <ChoiceToggleButton value="literature">Literature</ChoiceToggleButton>
                                <ChoiceToggleButton value="healthcare">Healthcare</ChoiceToggleButton>
                                <ChoiceToggleButton value="finance">Finance</ChoiceToggleButton>
                                <ChoiceToggleButton value="sports">Sports</ChoiceToggleButton>
                                <ChoiceToggleButton value="politics">Politics</ChoiceToggleButton>
                                <ChoiceToggleButton value="entertainment">Entertainment</ChoiceToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Grid>
                    <Button size="large" variant="contained" disabled={choices.length < 2} fullWidth>Next</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InterestSelection;