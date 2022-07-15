import { axiosInstance } from "../Resources/Constants";
import { GetProjectsResponse } from "../Resources/Constants";

export async function getRecommendedProjects(categories: string) {

    try {
        const { data } = await axiosInstance.post<GetProjectsResponse>("/project/recommended", categories)

        return data;
    } catch (error) {
        console.log(error);
    }
}