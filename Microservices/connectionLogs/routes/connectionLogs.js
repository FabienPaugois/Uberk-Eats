const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var connectionLogSchema = mongoose.Schema({
	userId: Number,
	date: Date,
	description: String
});

var ConnectionLog = mongoose.model('ConnectionLogs', connectionLogSchema);


const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
}

//#region GetAllConnectionLogs

/**
 * @api {get} /connectionLogs Request all ConnectionLogs information
 * @apiName GetConnectionLogs
 * @apiGroup ConnectionLogs
 *
 * @apiSuccess {String} userId Id of the User ConnectionLog.
 * @apiSuccess {String} date Date of the ConnectionLog.
 * @apiSuccess {String} description Description of the ConnectionLog.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		 "userId": 9,
 *		 "description": "Lorem Ipsum",
 *		 "date": "12/07/1998"
 *     },
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8dbqfe704",
 *		 "userId": 548,
 *		 "description": "Lorem Ipsum",
 *		 "date": "12/07/1998"
 *     },
 *      
 * @apiError ConnectionLogsNotAccessible ConnectionLogs were unaccessible.
 *
 */
/* GET ConnectionLogs. */
router.route('/')
	.get(authenticateJWT, function (req, res, next) {
		ConnectionLog.find(function (err, connectionLogs) {
			if (err) {
				res.send(err);
			}
			res.json(connectionLogs);
		})
	})
//#endregion
//#region PostConnectionLog
/**
* @api {post} /connectionLog/ Create ConnectionLog Information
* @apiVersion 1.0.0
* @apiName PostConnectionLog
* @apiGroup ConnectionLogs
 *
 * @apiSuccess {String} userId Id of the User ConnectionLog.
 * @apiSuccess {String} date Date of the ConnectionLog.
 * @apiSuccess {String} description Description of the ConnectionLog.
*
* @apiError ConnectionLogNotCreated ConnectionLog couldn't be created.
*/

/* POST ConnectionLogs. */
router.route('/')
	.post(authenticateJWT, function (req, res, next) {
		// Nous utilisons le sch??ma ConnectionLog
		var connectionLog = new ConnectionLog();
		// Nous r??cup??rons les donn??es re??ues pour les ajouter ?? l'objet ConnectionLog
		connectionLog.userId = req.body.userId;
		connectionLog.date = req.body.date;
		connectionLog.description = req.body.description;
		//Nous stockons l'objet en base
		connectionLog.save(function (err) {
			if (err) {
				res.send(err);
			}
			else {
				res.send(connectionLog);
			}
		});
	});
//#endregion
module.exports = router;