//import * as Sentry from "@sentry/browser";

//import Raven from "raven-js";

function init() {
  // Raven.config("ADD YOUR OWN API KEY", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
  // Sentry.init({
  //   dsn:
  //     "https://b02adf5107eb4eb7a8c865307c0a0f92@o383393.ingest.sentry.io/5213502",
  //});
}

function log(error) {
  // Raven.captureException(error);
  console.log(error);
  //Sentry.captureException(error);
}

// export default {
//   init,
//   log,
// };


 const logger ={
  init,
  log,
};
export default logger;