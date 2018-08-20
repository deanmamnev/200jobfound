var axios = require('axios')

var exports = module.exports = {}

exports.publicSearch = function (req, res) {
	var queryString = ""
	if (typeof req.query.category !== 'undefined') {
		queryString += ("&category=" + req.query.category)
	}
	queryString += "&format=json&keywords=" + req.query.keywords
	if (typeof req.query.location !== 'undefined') {
		queryString += ("&location=" + req.query.location)
	}
	queryString += "&method=aj.jobs.search"
	if (typeof req.query.sort !== 'undefined') {
		queryString += ("&sort=" + req.query.sort)
	}
	if (typeof req.query.telecommute !== 'undefined') {
		queryString += ("&telecommute=" + req.query.telecommute)
	}
	if (typeof req.query.type !== 'undefined') {
		queryString += ("&type=" + req.query.type)
	}
	console.log(`https://authenticjobs.com/api/?api_key=` + process.env.API_KEY + queryString)
	axios
		.get(`https://authenticjobs.com/api/?api_key=` + process.env.API_KEY + queryString)
		.then(function (resp) {
			console.log("!!!!!!!")
			var jobArray = []
			for (var i = 0; i < resp.data.listings.listing.length; i++) {
				var job = resp.data.listings.listing[i]
				var newJob = {
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
					job_id: job.id,
				}
				jobArray.push(newJob)
				if (jobArray.length == resp.data.listings.listing.length) {
					res.json(jobArray)
				}
			}
		})
}