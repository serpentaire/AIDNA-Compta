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
const soldeMensuelControllers = require("./controllers/soldeMensuelControllers");
const checkAuth = require("./middleware/authentification");

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

router.get("/enregistrement", compteControllers.browse);
router.get("/allCompteActif", nComptesControllers.comptesActif);
router.get("/enregistrement/:id", compteControllers.read);
router.get("/compteJournalier", compteControllers.cJournalier);
router.get("/modePaiement", modePayControllers.browse);
router.get("/banque", banqueControllers.browse);
router.get("/nComptes", nComptesControllers.browse);
router.get("/nComptes/:id", nComptesControllers.read);
router.put("/nComptes/:id", nComptesControllers.edit);
router.get("/roles", roleControllers.browse);
router.post("/login", loginControllers.validateLogin);
router.post("/users", usersControllers.add);
router.put("/firstconnexion", loginControllers.firstconnexion);
router.get("/soldeMensuel", soldeMensuelControllers.browse);
router.get("/distinctYear", compteControllers.distinctYear);

// mur d'authentification
router.post(
  "/enregistrement",
  checkAuth,
  upload.fields([{ name: "facture", maxCount: 1 }]),
  compteControllers.add
);
router.put(
  "/enregistrement/:id",
  checkAuth,
  upload.fields([{ name: "facture", maxCount: 1 }]),
  compteControllers.edit
);
router.put("/compteActive/:id", checkAuth, nComptesControllers.editActive);
router.put(
  "/enregistrementValidation/:id",
  checkAuth,
  compteControllers.editValidation
);
router.delete("/enregistrement/:id", checkAuth, compteControllers.destroy);
router.delete("/supfichier/:nom", checkAuth, compteControllers.destroyfichier);
router.post("/nComptes", checkAuth, nComptesControllers.add);
router.delete("/nComptes/:id", checkAuth, nComptesControllers.destroy);
router.post("/login", checkAuth, loginControllers.validateLogin);
router.post("/users", checkAuth, usersControllers.add);
router.put("/firstconnexion", checkAuth, loginControllers.firstconnexion);

module.exports = router;
