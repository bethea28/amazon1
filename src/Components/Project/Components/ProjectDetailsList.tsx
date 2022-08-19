import { Box, Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { GetProjectResponse, Project } from "../../../Resources/Constants";

export default function ProjectDetailsList(props: Project) {

    return (
        <Box className="Project-details-list">
            <Stack 
                key={props.projectId}
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                m={5}
            >
                <Card sx={{ maxWidth: 1000 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        image="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg"
                        alt="Pot of plants"
                    />
                    {/* Update Image to project photos prop */}
                    <CardContent>
                        <Typography variant="h1" m={1}>
                        {props.projectName}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={2}
                            >
                            <Chip label={props.categories} sx={{backgroundColor: 'rgb(166, 223, 139)' }}/>
                            <Typography variant="subtitle1" m={3}>
                            <Typography sx={{ fontWeight: 1000 }}>Created:</Typography> {props.createdAt} <Typography sx={{ fontWeight: 1000 }}>Last Updated:</Typography> {props.lastUpdatedAt}
                            </Typography>
                        </Stack>
                        {/* Insert targetFundingDate and targetFundingNum component here
                        Insert user data (avatar and name) component */}
                        <Typography variant="body1" m={3}>
                        {props.description}
                        </Typography>
                    </CardContent>
                    {/* Insert like component
                    Insert comments component */}
                </Card>
            </Stack>
        </Box>
    )
}