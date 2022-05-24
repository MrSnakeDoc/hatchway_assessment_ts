import * as dotenv from "dotenv";
dotenv.config();
import { DevConfig } from "./devConfig";
import { ProdConfig } from "./prodConfig";
import { devConfig } from "./devConfig";
import { prodConfig } from "./prodConfig";

const env = process.env.NODE_ENV;

let tempConfig: DevConfig | ProdConfig;

switch (env) {
  case "dev" || "development":
    tempConfig = {
      ...devConfig,
    };
    break;

  case "prod" || "production":
    tempConfig = {
      ...prodConfig,
    };
    break;

  default:
    tempConfig = {
      ...devConfig,
    };
    break;
}

export const config: DevConfig | ProdConfig = {
  ...tempConfig,
};
