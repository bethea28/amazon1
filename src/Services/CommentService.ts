import { axiosInstance, CommentData } from "../Resources/Constants";
import { Auth } from "aws-amplify";

export async function getProjectComments(projectId: string) {
    try {
        const { data } = await axiosInstance.get<CommentData[]>("/comments", {
            headers: {
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

export async function postComment(comment: CommentData, jwt: string) {
    try {
        const { data } = await axiosInstance.post<CommentData>("/comments", comment, {
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