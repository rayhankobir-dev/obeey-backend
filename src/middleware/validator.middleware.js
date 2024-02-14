import asyncHandler from "../helpers/asyncHandler.js";
import { ForbiddenError, BadRequestError } from "../core/ApiError.js";
import { schema, ValidationSource, Header } from "../helpers/validator.js";
import { capitalizeString } from "../helpers/utils.js";

// request validation
export const validation =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source], { abortEarly: false });

      if (!error) return next();

      // format the validation erros
      let errors = [];
      error.details.map((item) =>
        errors.push({
          message: capitalizeString(item.message.replace(/['"]+/g, "")),
        })
      );

      if (source === ValidationSource.HEADER) {
        throw new ForbiddenError("Permission denied", errors);
      }
      throw new BadRequestError("Bad request", errors);
    } catch (error) {
      next(error);
    }
  };

// api-key validation
export const apiKeyValidation = () => {
  return asyncHandler(async (req, res, next) => {
    const apiKey = req.headers[Header.API_KEY]?.toString();
    if (!apiKey) throw new ForbiddenError("x-api-key is required");
    if (process.env.API_KEY !== apiKey)
      throw new ForbiddenError("Invalid api key");
    next();
  });
};
