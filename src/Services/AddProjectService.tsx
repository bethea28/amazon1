import { axiosInstance, Project } from "../Resources/constants";
import { Auth } from "aws-amplify";
import { ProjectFormInput } from "../Resources/constants";

export const postData = async (state: any) => {
  try {
    const res = await Auth.currentSession();
    const jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.post<Project>("projects", state, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (
  projectId: string,
  state: ProjectFormInput
) => {
  const res = await Auth.currentSession();
  const jwt = res.getAccessToken().getJwtToken();
  return axiosInstance.put<any>(`/projects/${projectId}`, state, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
};
