import axios from "axios";
import { getServerHeaders } from "./get-server-headers";

export function axServer() {
  return axios.create({
    baseURL: `${process.env.SERVER_SIDE_BACKEND_URL}/api`,
    headers: { ...getServerHeaders() },
  });
}
