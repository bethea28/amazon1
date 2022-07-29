import { Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Project, GetProjectsResponse } from '../../Resources/Constants';
import { getProjectDetails } from '../../Services/ProjectService';
import ProjectDetailsList from './Components/ProjectDetailsList';


export default function ProjectDetails() {

    //Update to refer to specific project clicked on identified by project id
    //useParams or Context to pass in global projectId variable
    const projectID = "f476a834-cfea-4184-8596-d7bfbce50dfd"

    //Empty project details to be filled in once page renders
    const initialProjectState: Project[] = [{
        projectId: "",
        userId: "",
        projectName: "",
        targetFundingNum: "",
        targetFundingDate: "",
        description: "",
        categories: "",
        createdAt: "",
        lastUpdatedAt: ""
    }]

    const [currentProject, setCurrentProject] = useState<Project[]>(initialProjectState);

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
                <ProjectDetailsList projects={currentProject!} />
            </Box>
        </Box>
    )
}