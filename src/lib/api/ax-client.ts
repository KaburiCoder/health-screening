import { EnvData } from "@/contants/env-data";
import axios from "axios";

export const axClient = axios.create({
  baseURL: `${EnvData.CLIENT_URL}/api`,
  withCredentials: true,
});
