import { axiosInstance, Project } from "../Resources/Constants";
import { Auth } from 'aws-amplify';

export async function getRecommendedProjects(categories: string) {

    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.post<Project[]>("/project/recommended", categories, {
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
        const { data } = await axiosInstance.get<Project[]>("/project/recent", {
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
        console.log("jwt", jwt);
        const { data } = await axiosInstance.get<Project[]>(`/project/${id}`, {
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