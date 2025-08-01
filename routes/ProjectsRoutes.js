const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject
} = require("../controllers/ProjectsController");
const tachesRoutes = require('./TacheRoutes')
const router = express.Router();

router.post("/create_project", createProject);
router.get("/get_all", getAllProjects);
router.get("/get_by_id/:id", getProjectById);
router.delete("/delete_project/:id", deleteProject);
router.put("/update_project/:id", updateProject);

router.use('/:projectId/taches',tachesRoutes)

module.exports = router;
