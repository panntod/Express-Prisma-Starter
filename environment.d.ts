declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_SECRET: string;
      APP_PORT: string;
      [key: string]: string | undefined;
    }
  }
}
export {};
