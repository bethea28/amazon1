import { ToggleButton, Grid, Typography, ToggleButtonGroup, Button, Box, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { interests, User, initialUserData } from "../../Resources/Constants";
import { theme } from "../../Resources/GlobalTheme";
import { AuthContext } from '../../Context/AuthProvider';

function InterestSelection() {

  const navigate = useNavigate();
  const { id, token } = useContext(AuthContext);
    const [choices, setChoices] = useState(() => [""]);
    const ChoiceToggleButton = styled(ToggleButton)({
        backgroundColor: "#A6BBA7",
        width: "10em",
        fontWeight: 600,
        borderRadius: "50px!important",
    })

    function handleChoice(_event: React.MouseEvent<HTMLElement>, newChoices: string[]) {
        setChoices(newChoices);
    }

    async function handleSubmit(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        const user:Partial<User> = {interests: choices.slice(1)}
        await UserService.updateUser(id, token, user);
        navigate('/')
    }


    return (
        <ThemeProvider theme={theme}>
            <Box overflow={"auto"} sx={{display: 'flex', height: '100%', borderRadius: 4}}>
                <Grid container spacing={0} alignItems="center" height={"100%"}>
                    <Grid container item xs={4} bgcolor="#A6BBA7" height={"inherit"} justifyContent={"center"} alignItems={"center"}>
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