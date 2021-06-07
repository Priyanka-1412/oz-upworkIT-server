const mongoose = require('mongoose');
const db = require("../models");
const Project = db.project;

exports.listAllprojects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) res.send(err);
    res.json(projects);
  });
};

exports.createAProject = (req, res) => {
  const newProject = new Project(req.body);
  newProject.save((err, project) => {
    if (err) res.send(err);
    res.send(project);
  });
};

exports.readAProject = (req, res) => {
  Project.findById(req.params.projectId, (err, project) => {
    if (err) return res.send(err);
    res.send(project);
  });
};

exports.updateAProject = (req, res) => {
  Project.findOneAndUpdate(
    {_id: req.params.projectId},
    req.body,
    { new: true },
    (err, project) => {
      if (err) res.send(err);
      res.json(project);
    }
  )
};

exports.deleteAProject = (req, res) => {
  Project.deleteOne({_id: req.params.projectId}, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Project deleted successfully',
      _id: req.params.projectId
    });
  })
}
