import { axiosInstance, Transaction } from "../Resources/constants";
import { Auth } from "aws-amplify";
export async function getNewestTransaction() {
  try {
    const res = await Auth.currentSession();
    let jwt = res.getAccessToken().getJwtToken();
    const { data } = await axiosInstance.get<Transaction[]>(
      "/transactions/recent",
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
