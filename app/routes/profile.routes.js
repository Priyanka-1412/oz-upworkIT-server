const profileBuilder = require('../controllers/profile.controller');

module.exports = (app) => {
  app.route('/profiles')
    .get(profileBuilder.listAllProfiles)
    .post(profileBuilder.createAProfile);

  app.route('/profiles/:profileId')
    .get(profileBuilder.readAProfile)
    .put(profileBuilder.updateAProfile)
    .delete(profileBuilder.deleteAProfile);
};
