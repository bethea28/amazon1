import axios from "axios";

export const interests = ["music", "art", "food", "cars", "wildlife", "pets", "technology", "literature", "healthcare", "finance", "sports", "politics", "entertainment"]
export const tempUserID = "de3caccd-fa2c-4cd0-a1bc-c9a313a09a75";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
    }
})

export type GetProjectsResponse = {
    projects: Array<Project>
}

export type Project = {
    projectID: string,
    userID: string,
    projectName: string,
    description: string,
    categories: string,
    targetFundingDate: string,
    targetFundingNum: string
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