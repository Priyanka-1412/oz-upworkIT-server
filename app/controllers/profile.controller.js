const mongoose = require('mongoose');
const db = require("../models");
const {cloudinary}  = require('../config/cloudinary');
const Profile = db.profile;

//find userId in profile to establish association
exports.findProfile = (req, res) => {
	Profile.find({ user: req.params.userId })
		.populate("profile")
		.then((profile) => {
			res.json({ profile });
		})
		.catch((err) => console.log("There was an ERROR:", err));
};

//get all profiles
exports.listAllProfiles = (req, res) => {
  Profile.find({}, (err, profiles) => {
    if (err) res.send(err);
    res.json(profiles);
  });
};

//create a new profile
exports.createAProfile = async(req, res) => {
  const newProfile = new Profile(req.body);

	//save image src in fileStr variable
  const fileStr = req.body.previewSource; //from frontend
	console.log("fileStr", fileStr);

  newProfile.imageUrl = "";
  if (fileStr) {
		//use cloudinary uploader to upload cloudinary image
    const uploadResponse = await cloudinary.uploader.upload(fileStr,{});
    console.log(uploadResponse)
		//make imageUrl is equal to public_id from cloudinary
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

//read any particular profile using profileId
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
    req.body.profile[0].imageUrl = uploadResponse.public_id;
  } else {
    req.body.profile[0].imageUrl = '';
  }

  Profile.findOneAndUpdate({ user: req.params.userId }, req.body.profile[0], { new: true }, (err, profile) => {
		if (err) console.log('err', err);
		console.log("SEEMED TO BE UPDATED");
		console.log('PROFILE', profile);
		res.json(profile);
	});
};

//delete profile
exports.deleteAProfile = (req, res) => {
  Project.deleteOne({_id: req.params.profileId}, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Profile deleted successfully',
      _id: req.params.profileId
    });
  })
}
