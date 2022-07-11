import axios from "axios";
import { APIURL } from "../Resources/Constants";

export async function updateUser(update: object, userID: string) {

    type UpdateUserResponse = {
        data: object
    };

    try {
        await axios.put<UpdateUserResponse>(
            `${APIURL}/users/${userID}`,
            update,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json"
                },
            },
        );
    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}