import app from "./app.js";
import { port } from "./config.js";

app
  .listen(port, () => {
    console.log("Server running at: http://localhost:3000");
  })
  .on("error", (err) => {
    console.error(err);
  });
