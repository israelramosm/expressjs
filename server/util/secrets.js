import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env.globals")) {
  console.log("Using .env file to supply config environment variables");
  // Load environment variables from .env file, where API keys and passwords are configured
  dotenv.config({ path: ".env.globals" });
}

export const ENVIRONMENT = process.env.NODE_ENV;

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = !process.env.MONGODB_URI_TEST
  ? process.env.MONGODB_URI_LOCAL
  : process.env.MONGODB_URI_TEST;

// const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
// export const MONGODB_URI = prod
//   ? process.env.MONGODB_URI
//   : process.env.MONGODB_URI_LOCAL;

if (!SESSION_SECRET) {
  console.log("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  console.log(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}
