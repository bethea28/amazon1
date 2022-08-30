import { axiosInstance, Project } from "../Resources/constants";
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
export async function uploadPhoto(
  id: string,
  file: FormData,
  isCoverPhoto: boolean
) {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const response = await axiosInstance.post(`/projects/${id}/photos`, file, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: { isCoverPhoto: isCoverPhoto },
    });

    if (response.status === 200) {
      alert("Upload successful!");
    }
  } catch (error) {
    console.log(error);
    alert("Upload failed! Please try again.");
  }
}

export async function deletePhoto(id: String, filename: String) {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const response = await axiosInstance.delete(
      `/projects/${id}/photos/${filename}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.status === 200) {
      alert("Delete successful!");
    }
  } catch (error) {
    console.log(error);
    alert("Failed to delete! Please try again.");
  }
}
