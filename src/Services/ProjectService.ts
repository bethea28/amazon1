import { axiosInstance, Project } from "../Resources/Constants";
import { Auth } from 'aws-amplify';
import { Params } from "react-router-dom";

export async function getRecommendedProjects(categories: string) {

    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.post<Project[]>("/projects/recommended", categories, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getNewestProjects() {

    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.get<Project[]>("/projects/recent", {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getProjectDetails(id: string) {
    
    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.get<Project[]>(`/projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("data", data);
        return data;
    } catch (error) {
        console.log(error);
    }
}