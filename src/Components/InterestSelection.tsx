import { ToggleButton, Container, Grid, Typography, ToggleButtonGroup, Button, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

function InterestSelection() {

    const [choices, setChoices] = useState(() => [""]);

    const ChoiceToggleButton = styled(ToggleButton)({
        backgroundColor: "rgba(144, 216, 111, 0.57)",
        width: "125px",
        fontFamily: "Poppins",
        fontWeight: 600,
        borderRadius: "50px!important",
        margin: "10px"
    })

const theme = createTheme({
  palette: {
    primary: {
      main: '#90d86f',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

    function handleChoice(event: React.MouseEvent<HTMLElement>, newChoices: string[]) {
        console.log(event);
        setChoices(newChoices);
    }


    return (
        <Container>
            <ThemeProvider theme={theme}>
            <Grid container spacing={0} sx={{alignItems: "center", justifyContent: "end"}}>
                <Grid item xs={4} sx={{height: "100vh", backgroundColor: "rgba(209, 225, 210, 0.32)"}}>
                    <Typography sx={{padding: "60% 0"}} variant="h6">Let's Get Started</Typography>
                </Grid>
                <Grid item xs={8} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography variant="h6">Select what best describes your interests. (Select all that apply)</Typography>
                    <Container sx={{marginTop: "10%"}}>
                        <ToggleButtonGroup value={choices} onChange={handleChoice} sx={{flexWrap: "wrap", justifyContent: "center"}}>
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
                    </Container>
                <Button variant="contained" disabled={choices.length < 2} sx={{alignSelf: "flex-end", width: 125, borderRadius: 50}}>Next</Button>
                </Grid>
            </Grid>
            </ThemeProvider>
        </Container>
    )
}

export default InterestSelection;