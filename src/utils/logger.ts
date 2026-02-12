import pino from "pino";

const isProdEnv = process.env.NODE_ENV === "production";
export const logger = pino(
  isProdEnv
    ? {
        level: "info",
      }
    : {
        level: "debug",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
          },
        },
      },
);
