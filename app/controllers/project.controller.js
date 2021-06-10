const mongoose = require('mongoose');
//const textSearch = require('mongoose-text-search');
const db = require("../models");
const Project = db.project;

exports.findProject = (req, res) => {
	Project.find({ user: req.params.userId })
		.populate("project")
		.then((project) => {
			res.json({ project });
		})
		.catch((err) => console.log("There was an ERROR:", err));
};

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

exports.updateAProject = async(req, res) => {
  const fileStr = req.body.previewSource.previewSource;

  if (fileStr) {
    const uploadResponse = await cloudinary.uploader.upload(fileStr,{});
    console.log(uploadResponse)
    req.body.project[0].imageUrl = uploadResponse.public_id;
  } else {
    req.body.project[0].imageUrl = '';
  }

  Project.findOneAndUpdate(
    {_id: req.params.userId},
    req.body.project[0],
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

// exports.searchProject = (req, res) => {
// 	Project.textSearch(req.params, function(err, projects){
// 		if(err) return handleError(err);
// 		res.json(projects);
// 	});
// }
