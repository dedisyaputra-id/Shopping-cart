import logger from "./app/logging.js";
import web from "./app/web.js";

web.listen(3200, () => logger.info("server is running"));
