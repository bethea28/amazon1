import { axiosInstance } from "../Resources/Constants";

export async function getUser(userID: string) {

    type GetUserResponse = {
        id: number,
        avatar: string,
        bio: string,
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        interests: string[],
        projectIDs: string[]
    }

    try {
        const { data } = await axiosInstance.get<GetUserResponse>(`/users/${userID}`)

        return data.interests;
            
    } catch (error) {
        console.log(error);
    }
}

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