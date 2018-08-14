var axios = require('axios')
var db = require('../models')

var exports = module.exports = {}


exports.getSearch = function (req, res) {
    db.jobs.findAll({ where: { saved: false, user: req.user.id } }).then(data => {
        res.json(data)
    })
}

exports.getSaved = function (req, res) {
    db.jobs.findAll({ where: { saved: true, user: req.user.id } }).then(data => {
        res.json(data)
    })
}

exports.getTasks = function (req, res) {
    db.tasks.findAll({ where: { job: req.query.job } }).then(data => {
        res.json(data)
    })
}

exports.postSearch = function (req, res) {
    db.jobs.destroy({ where: { saved: false, user: req.user.id } }).then(function () {
        var search = req.query.q;
        axios
            .get(`https://authenticjobs.com/api/?api_key=7aa3eac14c96fe5c4fe58dc504d956e0&method=aj.jobs.search&keywords=${search}&format=json`)
            .then(({
                data: {
                    listings
                }
            }) => {
                for (var i = 0; i < listings.listing.length; i++) {
                    var job = listings.listing[i]
                    // var job_id = parseInt(job.id)
                    var jobs = []
                    db.jobs.findOrCreate({
                        where: { job_id: job.id, user: req.user.id }, defaults: {
                            title: job.title,
                            description: job.description,
                            post_date: job.post_date,
                            company_name: job.company.name,
                            category_name: job.category.name,
                            type_name: job.type.name,
                            apply_url: job.apply_url,
                            company_url: job.company.url,
                            url: job.url,
                            perks: job.perks,
                            user: req.user.id,
                            job_id: job.id,
                        }
                    }).then(newJob => {
                        jobs.push(newJob)
                        if (jobs.length == listings.listing.length) {
                            res.json(true)
                        }
                    });
                }
            })
    })
}

exports.postSaved = function (req, res) {
    var id = req.query.id
    db.jobs.update({ saved: true }, { where: { id: id } }).then((data) => {
        res.json(data)
    })
}

exports.postTasks = function (req, res) {
    var task = req.query.task
    var job = req.query.job
    db.tasks.create({ task: task, job: job }).then((data) => { res.json(data) })
}

exports.deleteSaved = function (req, res) {
    var id = req.query.id
    db.jobs.update({ saved: false }, { where: { id: id } }).then((data) => {
        var resObj = {
            url: "/search",
            results: data
        }
        res.json(resObj)
    })
}

exports.deleteTasks = function (req, res) {
    var id = req.query.id
    db.tasks.destroy({ where: { id: id } }).then((data) => { res.json(data) })
}

exports.logout = function (req, res) {
    req.logout()
    req.session.destroy(function (err) {
        res.json(true)
    });
}

exports.toggleTick = function (req, res) {
    var task = req.query.task
    var tick = req.query.tick
    db.tasks.update({ ticked: tick }, { where: { id: task } }).then((data) => { res.json(data) })
}