import axios from "axios";
import { getServerHeaders } from "./get-server-headers";
import { EnvData } from "@/contants/env-data";

export function axServer() {
  return axios.create({
    baseURL: `${EnvData.SERVER_URL}/api`,
    headers: { ...getServerHeaders() },
  });
}
