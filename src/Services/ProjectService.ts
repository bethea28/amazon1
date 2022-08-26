import { axiosInstance, Project } from "../Resources/Constants";
import { Auth } from 'aws-amplify';
import { Params } from "react-router-dom";

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
        const { data } = await axiosInstance.get<Project>(`/projects/${id}`, {
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

export async function uploadPhoto(id: string, file: FormData, isCoverPhoto: boolean) {


    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const response = await axiosInstance.post(`/projects/${id}/photos`, file, {
          headers: {
              'Authorization': `Bearer ${jwt}`,
          },
          params: { isCoverPhoto: isCoverPhoto }
      });
    
        if (response.status === 200) {
          alert('Upload successful!');
        }
    
      } catch(error) {
          console.log(error);
          alert('Upload failed! Please try again.')
        }
}

export async function deletePhoto(id: String, filename: String) { 
    try {
      const res = await Auth.currentSession()
      let jwt = res.getAccessToken().getJwtToken(); 
      const response = await axiosInstance.delete(`/projects/${id}/photos/${filename}`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    });
  
      if (response.status === 200) {
        alert('Delete successful!');
      }
      
    } catch(error) {
        console.log(error);
        alert('Failed to delete! Please try again.')
      }
  }
