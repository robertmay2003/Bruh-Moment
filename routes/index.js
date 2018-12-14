var express = require('express');
var router = express.Router();
let waiting = [];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bruh.' });
});

router.post('/setup', function (req, res) {
	console.log('post request to /setup');
	waiting.push(res);
	console.log(waiting.length);
});

router.post('/bruh', function(req, res) {
	res.send();
	console.log('someone pressed it');
	// clear waiting
	let saying = waiting.slice();
	waiting = [];

	for (let i = 0; i < saying.length; i++) {
		saying[i].send();
	}
});

module.exports = router;
