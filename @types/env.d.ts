declare namespace NodeJS {
  interface ProcessEnv {
    // common
    NEXT_ENV?: string;
    ADMIN_KEY?: string;
    // production
    NEXT_PUBLIC_SERVER_URL?: string;
  }
}
