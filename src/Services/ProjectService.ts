import { axiosInstance, Project } from "../Resources/Constants";

export async function getRecommendedProjects(categories: string) {

    try {
        const { data } = await axiosInstance.post<Project[]>("/project/recommended", categories)

        return data;
    } catch (error) {
        console.log(error);
    }
}