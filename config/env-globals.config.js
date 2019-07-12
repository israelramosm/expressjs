// const SESSION_SECRET = process.env.SESSION_SECRET;
// const MONGODB_URI = !process.env.MONGODB_URI_TEST
//   ? process.env.MONGODB_URI_LOCAL
//   : process.env.MONGODB_URI_TEST;

// const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
// const MONGODB_URI = prod
//   ? process.env.MONGODB_URI
//   : process.env.MONGODB_URI_LOCAL;

//Note we depend on NODE_ENV being set to dictate which of the env variables below get loaded at runtime.

//express port
const PORT = 4000;

//APIs
const BASE_API = "/api";
const v1_API = "/api/v1";
const v2_API = "/api/v2";

//DB URI connection
const MONGODB_URI_LOCAL =
  "mongodb://localhost:27017/fullstackjs";
// const MONGODB_URI_LOCAL =
//   "mongodb://fullstackjs:password@localhost:27017/fullstackjs";
const MONGODB_URI_TEST = "";

const MONGODB_URI = !MONGODB_URI_TEST ? MONGODB_URI_LOCAL : MONGODB_URI_TEST;

const SALT_WORK_FACTOR = 10;
const SESSION_SECRET = "sessionsecret";

module.exports = {
  SESSION_SECRET,
  MONGODB_URI,
  PORT,
  BASE_API,
  v1_API,
  v2_API
};
