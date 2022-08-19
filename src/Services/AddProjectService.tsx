import { axiosInstance } from '../Resources/Constants';
import { Auth } from 'aws-amplify';

export const postData = async (state:any) => {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken();    
    return axiosInstance.post('projects', state, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    }) 
}