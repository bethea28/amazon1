import { Box } from "@mui/material";
import { GetProjectsResponse } from "../../../Resources/Constants";

export default function ProjectDetailsList(props: GetProjectsResponse) {

    return (
        <Box className="Project-details">
            
            {props.projects && props.projects.map((project) => {
                return (
                    <Box key={project.projectId}>
                        <Box>
                            <h2>Title: {project.projectName}</h2>
                            <h2>Categories: {project.categories}</h2>
                            <h2>Description: {project.description}</h2>
                        </Box>
                    </Box>
                )
            })}
            
        </Box>
    )

}