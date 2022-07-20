import { axiosInstance, GetUserResponse, UpdateUserResponse } from "../Resources/Constants";

export async function getUser(userID: string) {

    try {
        const { data } = await axiosInstance.get<GetUserResponse>(`/users/${userID}`)

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