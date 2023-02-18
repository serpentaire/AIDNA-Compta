const express = require("express");

const router = express.Router();
const N_comptesControllers = require("./controllers/N_comptesControllers");
// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

router.get("/N_comptes", N_comptesControllers.browse);
router.get("/N_comptes/:id", N_comptesControllers.read);
router.put("/N_comptes/:id", N_comptesControllers.edit);
router.post("/N_comptes", N_comptesControllers.add);
router.delete("/N_comptes/:id", N_comptesControllers.destroy);
module.exports = router;
