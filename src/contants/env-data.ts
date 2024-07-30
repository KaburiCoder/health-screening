const ingressDomain = "ingress-nginx-controller.ingress-nginx.svc.cluster.local"

export class EnvData {
  public static NEXT_ENV: string = process.env.NEXT_ENV!;
  public static DOMAIN: string = process.env.NEXT_PUBLIC_CLIENT_DOMAIN!;
  public static CLIENT_URL: string = process.env.NEXT_PUBLIC_CLIENT_URL!;
  public static SOCKET_URL: string = process.env.NEXT_PUBLIC_SOCKET_URL!;
  public static SERVER_URL: string = process.env.NEXT_PUBLIC_SERVER_URL!;
}
