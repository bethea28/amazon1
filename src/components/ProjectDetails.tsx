import { Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Project } from '../Resources/Constants';
import { getProjectDetails } from '../Services/ProjectService';


export default function ProjectDetails(props: Project) {

    //Update to refer to specific project clicked on identified by project id
    //useParams or Context to pass in global projectId variable
    const projectID = "001"

    //Empty project details to be filled in once page renders
    const initialProjectState = {
        projectID: "",
        userID: "",
        projectName: "",
        description: "",
        categories: "",
        targetFundingDate: "",
        targetFundingNum: ""
    }

    const [currentProject, setCurrentProject] = useState<Project>(initialProjectState);

    //As soon as the page is rendered, getData function will get called
    useEffect(() => {

        const getData = async () => {

            //Call axios service to fetch data
            try {
                const response = await getProjectDetails(projectID);
                setCurrentProject(response!);

            } catch (error) {
                    console.log(error);
                }
            //Show fetched data on page by updating state
        }

        if (!currentProject) {
            getData();
        }

    }, [currentProject]);

    return (
        <Box className="Project-details">
            <Box className="Project-title">
                {props? <h2>Title: {currentProject.projectName}</h2> : null}
            </Box>
            <Box className="Project-categories">
            {props? <h2>Categories: {currentProject.categories}</h2> : null}
            </Box>
            <Box className="Project-description">
            {props? <h2>Description: {currentProject.description}</h2> : null}
            </Box>
        </Box>
    )
}