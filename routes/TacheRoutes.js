const express = require("express");

const {
  createTache,
  updateTache,
  deletTache,
  getTaches,
} = require("../controllers/TacheController");

const router = express.Router({ mergeParams: true });

router.post("/create_tache", createTache);
router.get("/get_taches", getTaches);
router.put("/update_tache/:tacheId", updateTache);
router.delete("/delete_tache/:tacheId", deletTache);

module.exports = router;
