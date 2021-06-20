const mongoose = require('mongoose');
//const textSearch = require('mongoose-text-search');
const db = require("../models");
const Project = db.project;

//find project of user using userId
exports.findProject = (req, res) => {
	Project.find({ user: req.params.userId })
		.populate("project")
		.then((project) => {
			res.json({ project });
		})
		.catch((err) => console.log("There was an ERROR:", err));
};

//get all projects
exports.listAllprojects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) res.send(err);
    res.json(projects);
  });
};

//create  a new project
exports.createAProject = (req, res) => {
	console.log("Create a project...");
	console.log(req.body);
  const newProject = new Project(req.body);
  newProject.save((err, project) => {
    if (err) res.send(err);
    res.send(project);
  });
};

//read any particular project using projectId
exports.readAProject = (req, res) => {
  Project.findById(req.params.projectId, (err, project) => {
    if (err) return res.send(err);
    res.send(project);
  });
};

//update a profile
exports.updateAProject = async(req, res) => {
  Project.findOneAndUpdate(
    { user: req.params.userId},
    req.body.project[0],
    { new: true },
    (err, project) => {
      if (err) res.send(err);
      res.json(project);
    }
  )
};

//delete a profile
exports.deleteAProject = (req, res) => {
  Project.deleteOne({_id: req.params.projectId}, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Project deleted successfully',
      _id: req.params.projectId
    });
  })
};

//search for project using keyword
exports.searchProjects = (req, res) => {
	console.log("searching projects..");
	const keyword = req.params.keyword;
	console.log(keyword);

	Project.find({
		$text: {$search: keyword},
	})
	.then(projects => res.json(projects))
	.catch(e => console.log(e));
};
