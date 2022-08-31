import { axiosInstance, CommentData } from "../Resources/constants";
import { Auth } from "aws-amplify";


/**
 * Gets a list of comments by project ID
 * @param projectId A project id to be searched
 * @returns A promise containing a list of comments relating to the current project
 */
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
/**
 * Adds a new comment
 * @param comment A comment to be added
 * @param jwt A JWT token authorizing a user to add a comment
 * @returns A promise containing the newly created CommentData
 */
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