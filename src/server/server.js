import app from "./app";

const server = app;

server.listen(process.env.PORT || "3000", () => {
  console.log(`[Server] Express server listen on port: ${process.env.PORT}`);
});
