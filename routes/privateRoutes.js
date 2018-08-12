const controller = require('../controller/privateController.js');

module.exports = function (app, passport) {

    app.get('/api/search', controller.getSearch)

    app.get('/api/saved', controller.getSaved)

    app.get('/api/tasks', controller.getTasks)



    app.post('/api/search', controller.postSearch)

    app.post('/api/saved', controller.postSaved)

    app.post('/api/tasks', controller.postTasks)



    app.delete('/api/saved', controller.deleteSaved)

    app.delete('/api/tasks', controller.deleteTasks)


    app.get('/api/logout', controller.logout)
}