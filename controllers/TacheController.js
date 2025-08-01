const { where } = require("sequelize");
const { Tache, Project } = require("../models");

const createTache = async (req, res) => {
  const projectId = req.params.projectId;
  const { titre, statut } = req.body;
  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.statut(404).json({ message: "Projet non trouvé" });
  }
  if (!titre) {
    return res.statut(400).json({ message: "Le tittre est requis !!!!!!" });
  }
  const tache = await Tache.create({ titre, statut, project_id: project.id });
  res.status(201).json(tache);
};

const getTaches = async (req, res) => {
  const projectId = req.params.projectId;

  const project = await Project.findByPk(projectId);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé"});
  }
  
  const taches = await Tache.findAll({where:{project_id: projectId}})
  res.json(taches)

}


const updateTache = async (req, res) => {
  const tacheId = req.params.tacheId;
  
  const {titre, statut} = req.body;

  const tache = await Tache.findByPk(tacheId)

  if(!tache) {
    return res.status(404).json({message: " tache non trouvée"});
  }

  await tache.update({titre, statut})
  res.json(tache)
}

const deletTache = async (req, res) => {
  const tacheId = req.params.tacheId;
  const tache = await Tache.findByPk(tacheId)

  if (!tache) {
    return res.status(404).json({message: "la tache n'existe pas"})
  }

  await tache.destroy();
  res.status(204).send()
}

module.exports = {
  createTache,
  getTaches,
  updateTache,
  deletTache
};

