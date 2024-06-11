export type SocketResponse<T> = {
  status: "success" | "error" | "none";
  data?: T;
  error?: { [key: string]: string };
  message?: string;
}