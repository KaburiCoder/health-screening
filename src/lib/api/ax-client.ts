import { EnvData } from "@/contants/env-data";
import axios from "axios";

export const axClient = axios.create({
  baseURL: `${EnvData.BASE_URL}/api`,
  withCredentials: true,
});
