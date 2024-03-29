import multer from "multer";
import path from "path";

// multer middleware configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.cwd() + "/public/temp/");
  },
  filename: function (req, file, callback) {
    console.log(req.body);
    const fileExt = path.extname(file.originalname).toLowerCase();
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + prefix + fileExt);
  },
});

// Multer file filter function
const fileFilter = function (allowedExtensions) {
  return function (req, file, callback) {
    const fieldname = file.fieldname;
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions[fieldname].includes(fileExt)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type of the " + fieldname));
    }
  };
};
export const upload = (allowedExtensions) =>
  multer({
    storage: storage,
    fileFilter: fileFilter(allowedExtensions),
  });

export function validateFiles(req, res, next) {
  console.log(req.body);
  Object.keys(req.files).forEach((fieldName) => {
    req.body[fieldName] = req.files[fieldName][0];
  });
  next();
}
