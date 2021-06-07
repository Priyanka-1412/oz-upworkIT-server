const projectBuilder = require('../controllers/project.controller');

module.exports = (app) => {
  app.route('/projects')
    .get(projectBuilder.listAllprojects)
    .post(projectBuilder.createAProject);

  app.route('/projects/:projectId')
    .get(projectBuilder.readAProject)
    .put(projectBuilder.updateAProject)
    .delete(projectBuilder.deleteAProject);
};
