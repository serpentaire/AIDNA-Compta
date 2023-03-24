const express = require("express");
const multer = require("multer");

const router = express.Router();
const nComptesControllers = require("./controllers/nComptesControllers");
const loginControllers = require("./controllers/loginControllers");
const banqueControllers = require("./controllers/banqueControllers");
const modePayControllers = require("./controllers/modePayControllers");
const compteControllers = require("./controllers/compteControllers");
const roleControllers = require("./controllers/roleControllers");
const usersControllers = require("./controllers/usersControllers");
// const itemControllers = require("./controllers/itemControllers");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    const fileArray = file.originalname.split(".");
    const ext = fileArray.pop();
    const filename = fileArray.join("_").split(" ").join("_");
    cb(
      null,
      `${file.fieldname === "/images/"}${`${filename}_${Date.now()}.${ext}`}`
    );
  },
});
const upload = multer({ storage });

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
router.post(
  "/enregistrement",
  upload.fields([{ name: "facture", maxCount: 1 }]),
  compteControllers.add
);
router.get("/enregistrement", compteControllers.browse);
router.put(
  "/enregistrement/:id",
  upload.fields([{ name: "facture", maxCount: 1 }]),
  compteControllers.edit
);
router.put("/compteActive/:id", nComptesControllers.editActive);
router.put("/enregistrementValidation/:id", compteControllers.editValidation);
router.delete("/enregistrement/:id", compteControllers.destroy);
router.get("/enregistrement/:id", compteControllers.read);
router.get("/compteJournalier", compteControllers.cJournalier);
router.get("/modePaiement", modePayControllers.browse);
router.get("/banque", banqueControllers.browse);
router.get("/nComptes", nComptesControllers.browse);
router.get("/nComptes/:id", nComptesControllers.read);
router.put("/nComptes/:id", nComptesControllers.edit);
router.post("/nComptes", nComptesControllers.add);
router.delete("/nComptes/:id", nComptesControllers.destroy);
router.get("/roles", roleControllers.browse);
router.post("/login", loginControllers.validateLogin);
router.post("/users", usersControllers.add);
router.put("/firstconnexion", loginControllers.firstconnexion);

module.exports = router;
