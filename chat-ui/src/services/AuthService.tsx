import axios from "axios";
import { BACKEND_APP_URL } from "../costants/GenericCostants";

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_APP_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
