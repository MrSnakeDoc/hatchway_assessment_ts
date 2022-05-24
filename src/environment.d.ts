declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "dev" | "production" | "prod";
    HOST?: string;
    PORT?: string;
    PG_URL?: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
