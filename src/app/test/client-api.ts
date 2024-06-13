import { axClient } from "@/lib/api/ax-client";
import axios from "axios";

export async function clientApi() {
  try {
    const response = await axios.create({
      baseURL: "https://hs.click-soft.co.kr",
      headers: {
        Host: "hs.click-soft.co.kr",
      }
    }).post("/api/currentuser", {})

    return response.data;
  } catch (errr) {
    return errr
  }
}