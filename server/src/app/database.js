import { PrismaClient } from "@prisma/client";
import logger from "./logging.js";

const prismaDb = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaDb.$on("query", (e) => {
  logger.info(e.query);
});
prismaDb.$on("info", (e) => {
  logger.info(e);
});
prismaDb.$on("warn", (e) => {
  logger.info(e);
});
prismaDb.$on("error", (e) => {
  logger.info(e);
});

export default prismaDb;
