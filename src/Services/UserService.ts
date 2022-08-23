import { axiosInstance, GetUserResponse, UpdateUserResponse } from "../Resources/Constants";
import { Auth } from "aws-amplify";

export async function getUser(userID: string) {

    try {
        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken(); 
        const { data } = await axiosInstance.get<GetUserResponse>(`/users/${userID}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        })

        return data;
            
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(update: object, userID: string) {

    try {
        await axiosInstance.put<UpdateUserResponse>(`/users/${userID}`, update);
    } catch (error) {
        console.log(error);
    }
}