'use server'

import axios from "axios";
export async function testApi() {
  // return { isIngress: EnvData.IS_INGRESS }
  try {
    const response = await axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        Host: "hs-local.click-soft.co.kr",
      }
    }).post("/api/currentuser", {})

    return response.data;
  } catch (errr) {
    return errr
  }
}