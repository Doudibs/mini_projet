const { Project } = require("../models");
const {validationResult} = require("express-validator")

const createProject = async (req, res) => {
 
  try {
    const { nom, description } = req.body;
    const project = await Project.create({ nom, descriprion: description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur Serveur !", error });
  }
};

const getAllProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const id = req.params.id;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }

  return res.json(project);
};

const deleteProject = async (req, res) => {
  const id = req.params.id;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }

  await project.destroy();
  res.status(204).send();
};

const updateProject = async (req, res) => {
  const id = req.params.id;

  const { nom, description } = req.body;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }
  await project.update({ nom, descriprion: description });
  res.json(project);
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
};
