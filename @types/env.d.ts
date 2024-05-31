declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_URL?: string;
    SERVER_SIDE_BACKEND_URL?: string;
    JWT_KEY?: string;
    ENC_KEY?: string;
  }
}
