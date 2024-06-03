export const dynamic = 'force-dynamic';

export class EnvData {
  public static IS_PRODUCT: boolean = process.env.NODE_ENV === "production";
  public static IS_INGRESS: boolean = process.env.NEXT_ENV === "ingress";
  public static DOMAIN = EnvData.IS_PRODUCT
    ? "hs.click-soft.co.kr"
    : "localhost:4020";
  public static BASE_URL: string = EnvData.IS_PRODUCT
    ? `https://${EnvData.DOMAIN}`
    : `http://${EnvData.DOMAIN}`;
  public static SERVER_URL = EnvData.IS_INGRESS
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : EnvData.BASE_URL;

}
