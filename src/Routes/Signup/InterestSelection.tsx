import { ToggleButton, Grid, Typography, ToggleButtonGroup, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { APIURL } from "../../Resources/Constants"

function InterestSelection() {

    const [choices, setChoices] = useState(() => [""]);

    const ChoiceToggleButton = styled(ToggleButton)({
        backgroundColor: "rgba(144, 216, 111, 0.57)",
        width: "10em",
        fontWeight: 600,
        borderRadius: "50px!important",
    })

    const tempUserID = "de3caccd-fa2c-4cd0-a1bc-c9a313a09a75";

    type UpdateUserResponse = {
        interests: object
    };

    async function updateUser() {
        try {
            const { data } = await axios.put<UpdateUserResponse>(
                `${APIURL}/users/${tempUserID}`,
                {
                    interests: choices.slice(1)
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Accept: "application/json"
                    },
                },
            );
            console.log(JSON.stringify(data, null, 4));
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    }

    function handleChoice(event: React.MouseEvent<HTMLElement>, newChoices: string[]) {
        // const target = event.target as HTMLInputElement;
        setChoices(newChoices);
    }

    function handleSubmit(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        updateUser();
    }


    return (
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
                    <Button onClick={handleSubmit} size="large" variant="contained" disabled={choices.length < 2} fullWidth>Next</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InterestSelection;