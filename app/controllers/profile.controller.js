const mongoose = require('mongoose');
const db = require("../models");
const {cloudinary}  = require('../utils/cloudinary');
const Profile = db.profile;


exports.findProfile = (req, res) => {
	Profile.find({ user: req.params.userId })
		.populate("profile")
		.then((err, profile) => {
			if (err) res.send(err);
			res.json({ profile });
		})
		.catch((err) => console.log("There was an ERROR:", err));
};

exports.listAllProfiles = (req, res) => {
  Profile.find({}, (err, profiles) => {
    if (err) res.send(err);
    res.json(profiles);
  });
};

exports.createAProfile = async(req, res) => {
  const newProfile = new Profile(req.body);
  const fileStr = req.body.previewSource; //from frontend
	console.log("fileStr", fileStr);

  newProfile.imageUrl = "";
  if (fileStr) {
    const uploadResponse = await cloudinary.uploader.upload(fileStr,{});
    console.log(uploadResponse)
    newProfile.imageUrl = uploadResponse.public_id;
  } else {
    newProfile.imageUrl = '';
  }
  newProfile.save((err, profile) => {
		console.log("err", err);
    if (err) res.send(err);
		console.log('profile', profile);
    res.send(profile);
  });
};

exports.readAProfile = (req, res) => {
  Profile.findById(req.params.profileId, (err, profile) => {
    if (err) res.send(err);
    res.send(profile)
  });
};

exports.updateAProfile = async(req, res) => {
  console.log(req.body);
  const fileStr = req.body.previewSource.previewSource; //from frontend

  if (fileStr) {
    const uploadResponse = await cloudinary.uploader.upload(fileStr,{});
    console.log(uploadResponse)
    req.body.imageUrl = uploadResponse.public_id;
  } else {
    req.body.imageUrl = '';
  }

  Profile.findOneAndUpdate({_id: req.params.profileId}, { user: req.params.userId }, req.body, { new: true }, (err, profile) => {
		if (err) res.send(err);
		res.json(profile);
	});

  // Profile.findOneAndUpdate(
  //
  //   {_id: req.params.profileId},
  //   req.body,
  //   { new: true },
  //   (err, profile) => {
  //     if (err) res.send(err);
  //     res.json(profile);
  //   }
  // )
};


exports.deleteAProfile = (req, res) => {
  Project.deleteOne({_id: req.params.profileId}, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Profile deleted successfully',
      _id: req.params.profileId
    });
  })
}
