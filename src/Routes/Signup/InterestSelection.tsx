import { ToggleButton, Grid, Typography, ToggleButtonGroup, Button, Box, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Header from "../../Components/Header";
import { updateUser } from "../../Services/UserService";
import { tempUserID, interests } from "../../Resources/Constants";
import { theme } from "../../Resources/GlobalTheme";

function InterestSelection() {

    const [choices, setChoices] = useState(() => [""]);
    const ChoiceToggleButton = styled(ToggleButton)({
        backgroundColor: "rgba(144, 216, 111, 0.57)",
        width: "10em",
        fontWeight: 600,
        borderRadius: "50px!important",
    })

    function handleChoice(_event: React.MouseEvent<HTMLElement>, newChoices: string[]) {
        setChoices(newChoices);
    }

    function handleSubmit(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        updateUser({ interests: choices.slice(1) }, tempUserID);
    }


    return (
        <ThemeProvider theme={theme}>
            <Box flex={1} overflow={"auto"}>
                <Header />
                <Grid container spacing={0} alignItems="center" height={"100%"}>
                    <Grid container item xs={4} bgcolor="rgba(209, 225, 210, 0.32)" height={"inherit"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item>
                            <Typography fontWeight={"600"} variant="h4">Let's Get Started</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item height={"100%"} xs={8} alignContent={"space-around"} justifyContent={"center"}>
                        <Grid item>
                            <Box>
                                <Typography variant="h5">Select what best describes your interests</Typography>
                                <Typography variant="h5">(Select all that apply)</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <ToggleButtonGroup size="large" value={choices} onChange={handleChoice} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
                                    {interests.map((interest, idx) => <ChoiceToggleButton key={idx} value={interest}>{interest}</ChoiceToggleButton>)}
                                </ToggleButtonGroup>
                            </Box>
                        </Grid>
                        <Button onClick={handleSubmit} size="large" variant="contained" disabled={choices.length < 2} fullWidth>Next</Button>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default InterestSelection;