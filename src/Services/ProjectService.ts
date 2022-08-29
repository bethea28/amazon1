import { axiosInstance, Project } from "../Resources/Constants";
import { Auth } from "aws-amplify";

export async function getRecommendedProjects(categories: string) {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.post<Project[]>(
      "/projects/recommended",
      categories,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getNewestProjects() {
  try {
    const { data } = await axiosInstance.get<Project[]>("/projects/recent", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectDetails(id: string) {
  try {
    const { data } = await axiosInstance.get<Project>(`/projects/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get all projects liked by the userId
 * @params userId the id of the user
 */
export async function getLikedProjects(userId: string) {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.get<Project[]>("/likes/users", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      params: { id: `${userId}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get all projects by userId
 * @params userId the id of the user
 */
export async function getMyProjects(userId: string) {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.get<Project[]>(
      "/projects/userprojects",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        params: { userId },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
