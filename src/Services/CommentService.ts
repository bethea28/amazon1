import { axiosInstance, CommentData } from "../Resources/Constants";
import { Auth } from "aws-amplify";

export async function getProjectComments(projectId: string) {
    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.get<CommentData[]>("/comments", {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            params: {
                id: projectId
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}