import { axiosInstance } from "../Resources/Constants";

export async function updateUser(update: object, userID: string) {

    type UpdateUserResponse = {
        data: object
    };

    try {
        await axiosInstance.put<UpdateUserResponse>(`/users/${userID}`, update);
    } catch (error) {
        console.log(error);
    }
}