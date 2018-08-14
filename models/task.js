
module.exports = function (sequelize, Sequelize) {

    var Task = sequelize.define('tasks', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        task: { type: Sequelize.TEXT },
        ticked: { type: Sequelize.BOOLEAN, defaultValue: false },
        job: { type: Sequelize.INTEGER },
    },
        {
            timestamps: false
        }
    );

    return Task;
}
