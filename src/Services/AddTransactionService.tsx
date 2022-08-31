import { axiosInstance } from "../Resources/constants";
import { Auth } from "aws-amplify";

export async function postTransacData(state: any) {
  try {
    const res = await Auth.currentSession();
    const jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.post("transactions", state, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
