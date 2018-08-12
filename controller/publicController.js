var axios = require('axios')

var exports = module.exports = {}

exports.publicSearch = function (req, res) {
	var search = req.query.q;
	axios
		.get(`https://authenticjobs.com/api/?api_key=7aa3eac14c96fe5c4fe58dc504d956e0&method=aj.jobs.search&keywords=${search}&format=json`)
		.then(function(resp) {res.json(resp.data.listings.listing)})
}