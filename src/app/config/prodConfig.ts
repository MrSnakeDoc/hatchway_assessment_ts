import * as dotenv from "dotenv";
dotenv.config();

export class ProdConfig {
  host: string;
  port: number;
  pg_url: string;
  redis_url: string;
  JWT_SECRET: string;
  REFRESH_JWT_SECRET: string;
  HOST_ONLINE: string;
  CLOUD_NAME: string;
  API_KEY: string;
  API_SECRET: string;
}

export const prodConfig: ProdConfig = {
  host: process.env.HOST ?? "localhost",
  port: process.env.PORT ? +process.env.PORT : 8000,
  pg_url: process.env.DATABASE_URL ?? "",
  redis_url: process.env.REDIS_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET ?? "",
  HOST_ONLINE: process.env.HOST_ONLINE ?? "",
  CLOUD_NAME: process.env.CLOUD_NAME ?? "",
  API_KEY: process.env.API_KEY ?? "",
  API_SECRET: process.env.API_SECRET ?? "",
};
