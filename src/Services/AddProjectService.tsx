import { axiosInstance, Project } from '../Resources/Constants';
import { Auth } from 'aws-amplify';
import { ProjectFormInput } from '../Resources/Constants';

export const postData = async (state:any) => {
    try {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.post<Project>('projects', state, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
    return data;
    } catch (error) {
    console.log(error);
    }
    // return axiosInstance.post<Project>('projects', state, {
    //     headers: {
    //         'Authorization': `Bearer ${jwt}`,
    //         'Content-Type': 'application/json'
    //     }
    // })
}

export const updateData = async (projectId: string, state: ProjectFormInput) => {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken();
    return axiosInstance.patch<any>(`/projects/${projectId}`, state, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
}

