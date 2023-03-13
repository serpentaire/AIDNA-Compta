const express = require("express");

const router = express.Router();
const nComptesControllers = require("./controllers/nComptesControllers");
const loginControllers = require("./controllers/loginControllers");
const banqueControllers = require("./controllers/banqueControllers");
const modePayControllers = require("./controllers/modePayControllers");
// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
router.get("/modePaiement", modePayControllers.browse);
router.get("/banque", banqueControllers.browse);
router.get("/nComptes", nComptesControllers.browse);
router.get("/nComptes/:id", nComptesControllers.read);
router.put("/nComptes/:id", nComptesControllers.edit);
router.post("/nComptes", nComptesControllers.add);
router.delete("/nComptes/:id", nComptesControllers.destroy);

router.post("/login", loginControllers.validateLogin);
router.get("/login", loginControllers.browse);

module.exports = router;
