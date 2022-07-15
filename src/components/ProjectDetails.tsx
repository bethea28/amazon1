import { Box, TextField, Avatar, Button } from '@mui/material';
import ProjectService from '../services/ProjectService';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';



export default function ProjectDetails(props: String) {

    //Refer to specific project clicked on identified by project id
    
    // let params = useParams;
    // console.log(params);

    //Or use Context to pass in global projectId variable

    //Empty project details to be filled in once page renders
    const initialProjectState = {
        projectId: null,
        userId: "",
        projectName: "",
        targetFundingNum: "",
        targetFundingDate: "",
        description: "",
        categories: ""
    }

    const projectId = "001"

    const [currentProject, setCurrentProject] = useState(initialProjectState);

    //As soon as the page is rendered, getData function will get called
    useEffect(() => {

        const getData = async () => {

            //Call axios service to fetch data
            const data = await ProjectService.getProject(projectId);

            //Show fetched data on page by updating state
            setCurrentProject(data);

        };

        getData();

    }, []);

    console.log("Project Details: ", currentProject);


    return (
        <Box className="Project">
            {currentProject.data? <h2>Title: {currentProject.data.projectName}</h2> : null}
        </Box>
    )



}