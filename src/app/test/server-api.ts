'use server'

import { axClient } from "@/lib/api/ax-client";
import axios from "axios";

export async function testApi() {
  try {
    axios.post("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/signin", {})
  } catch (errr) {
    console.log(errr);

  }
}