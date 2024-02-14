import express from "express";
import cors from "cors";
import { corsUrl, environment } from "./config.js";
import { ApiError, InternalError, NotFoundError } from "./core/ApiError.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use("/api/v1", router);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// middleware error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === "development") console.error(err);
    ApiError.handle(new InternalError(err.message), res);
  }
});

export default app;
