var axios = require('axios')

var exports = module.exports = {}

exports.publicSearch = function (req, res) {
	var queryString = ""
	if (typeof req.query.category !== 'undefined') {
		queryString += ("&category=" + req.query.category)
	}
	queryString += "&format=json&keywords=" +  req.query.keywords
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
	console.log(`https://authenticjobs.com/api/?api_key=7aa3eac14c96fe5c4fe58dc504d956e0`+ queryString)
	axios
		.get(`https://authenticjobs.com/api/?api_key=7aa3eac14c96fe5c4fe58dc504d956e0`+ queryString)
		.then(function(resp) {
			res.json(resp.data.listings.listing)})
}