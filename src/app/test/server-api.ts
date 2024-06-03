'use server'

import axios from "axios";
export async function testApi() {
  // return { isIngress: EnvData.IS_INGRESS }
  try {
    await axios.create({
      baseURL: process.env.NEXT_PUBLIC_INGRESS_URL,
      headers: {
        Host: "hs-local.click-soft.co.kr",
      }
    }).post("/api/currentuser", {})
  } catch (errr) {
    return errr
  }
}