import axios from "axios";

export const interests = ["music", "art", "food", "cars", "wildlife", "pets", "technology", "literature", "healthcare", "finance", "sports", "politics", "entertainment"]
export const tempUserID = "de3caccd-fa2c-4cd0-a1bc-c9a313a09a75";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        //"Authorization": `Bearer ${jwt}`, //(commented out until api token is determined)
    }
})

export type GetProjectsResponse = {
    projects: Array<Project>
}

export type Project = {
    projectId: string,
    userId: string,
    projectName: string,
    targetFundingNum: string
    targetFundingDate: string,
    description: string,
    categories: string,
    createdAt: string
    lastUpdatedAt: string,
}

export type GetUserResponse = {
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

export type UpdateUserResponse = {
    data: object
};