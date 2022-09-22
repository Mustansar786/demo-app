const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/User/index");
const path = require("path");
const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file, "check file");
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
    //path.extname get the uploaded file extension
  },
});

var upload = multer({ storage: storage });

router.get("/app/get_user", controller.getUser);
router.post("/app/add_user", upload.single("image"), controller.createUser);
router.get("/app/get_user/:id", controller.getUserById);
router.put("/app/update_user/:id", controller.updateUser);
router.delete("/app/delete_user/:id", controller.deleteUser);

module.exports = router;
