const mongoose = require('mongoose');
const db = require("../models");
const Profile = db.profile;

exports.listAllProfiles = (req, res) => {
  Profile.find({}, (err, profiles) => {
    if (err) res.send(err);
    res.json(profiles);
  });
};

exports.createAProfile = (req, res) => {
  const newProfile = new Profile(req.body);
  newProfile.save((err, profile) => {
    if (err) res.send(err);
    res.send(profile);
  });
};

exports.readAProfile = (req, res) => {
  Profile.findById(req.params.profileId, (err, profile) => {
    if (err) res.send(err);
    res.send(profile)
  });
};

exports.updateAProfile = (req, res) => {
  Profile.findOneAndUpdate(
    {_id: req.params.profileId},
    req.body,
    { new: true },
    (err, profile) => {
      if (err) res.send(err);
      res.json(profile);
    }
  )
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
