import { axiosInstance, Project } from "../Resources/Constants";

export async function getRecommendedProjects(categories: string) {

    try {
        const { data } = await axiosInstance.post<Project[]>("/project/recommended", categories)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getNewestProjects() {

    try {
        const { data } = await axiosInstance.get<Project[]>("/project/recent")
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getProjectDetails(projectID: string) {
    
    try {
        const { data } = await axiosInstance.get<Project>(`/project/${projectID}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}