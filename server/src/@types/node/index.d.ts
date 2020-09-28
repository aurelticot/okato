declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    WEB_CONCURRENCY?: string;
    NODE_ENV?: string;
    ENVIRONMENT_ID?: string;
    LOG_LEVEL?: string;
  }
}
