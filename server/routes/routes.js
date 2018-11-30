import express from "express";
import path from "path";

const base = express.Router();
const v1 = express.Router();

export default app => {
  app.use(process.env.BASE_API, base);
  app.use(process.env.v1_API, v1);
  /** static routes / */
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
  });

  /** route /api */

  /** route /api/v1 */
};
