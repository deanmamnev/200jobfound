
module.exports = function (sequelize, Sequelize) {

    var Job = sequelize.define('jobs', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        title: { type: Sequelize.TEXT },
        description: { type: Sequelize.TEXT },
        post_date: { type: Sequelize.DATE },
        company_name: { type: Sequelize.TEXT },
        category_name: { type: Sequelize.TEXT },
        type_name: { type: Sequelize.TEXT },
        apply_url: { type: Sequelize.TEXT },
        company_url: { type: Sequelize.TEXT },
        perks: { type: Sequelize.TEXT },
        url: { type: Sequelize.TEXT },
        user: { type: Sequelize.INTEGER },
        saved: { type: Sequelize.BOOLEAN, defaultValue: false },
        job_id: {type: Sequelize.INTEGER},
    },
        {
            timestamps: false
        }
    );

    return Job;
}
