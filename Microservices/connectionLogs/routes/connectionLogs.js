const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var connectionLogSchema = mongoose.Schema({
	userId: Number,
	date: String,
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
 * @apiSuccess {String} name Name of the ConnectionLog.
 * @apiSuccess {String} price Price of the ConnectionLog.
 * @apiSuccess {String} description Description of the ConnectionLog.
 * @apiSuccess {String} imgUrl ImgUrl of the ConnectionLog.
 * @apiSuccess {Array} articles Articles array of the ConnectionLog.
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
router.route('/connectionLogs')
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
* @apiSuccess {String} name Name of the ConnectionLog.
* @apiSuccess {String} price Price of the ConnectionLog.
* @apiSuccess {String} description Description of the ConnectionLog.
* @apiSuccess {String} imgUrl ImgUrl of the ConnectionLog.
* @apiSuccess {Array} articles Articles array of the ConnectionLog.
*
* @apiError ConnectionLogNotCreated ConnectionLog couldn't be created.
*/

/* POST ConnectionLogs. */
router.route('/connectionLog')
	.post(authenticateJWT, function (req, res, next) {
		// Nous utilisons le schéma ConnectionLog
		var connectionLog = new ConnectionLog();
		// Nous récupérons les données reçues pour les ajouter à l'objet ConnectionLog
		connectionLog.name = req.body.name;
		connectionLog.price = req.body.price;
		connectionLog.description = req.body.description;
		connectionLog.imgUrl = req.body.imgUrl;
		connectionLog.articles = req.body.articles;
		//Nous stockons l'objet en base
		connectionLog.save(function (err) {
			if (err) {
				res.send(err);
			}
			else {
				res.send("Created");
			}
		});
	});
//#endregion
//#region GetConnectionLogsById
/**
 * @api {get} /connectionLog/:connectionLog_ids Request ConnectionLogs information
 * @apiName GetConnectionLog
 * @apiGroup ConnectionLog
 *
* @apiParam {string} connectionLog_ids List of ConnectionLog unique IDs, separated by commas.
 *
 * @apiSuccess {String} name Name of the ConnectionLog.
 * @apiSuccess {String} price Price of the ConnectionLog.
 * @apiSuccess {String} description Description of the ConnectionLog.
 * @apiSuccess {String} imgUrl ImgUrl of the ConnectionLog.
 * @apiSuccess {Array} articles Articles array of the ConnectionLog.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		 "articles": [
 *		     0,
 *		     0,
 *		     0
 *		],
 *		"name": "BigMacConnectionLog",
 *		"price": "12",
 *		"description": "Good connectionLog",
 *		"imgUrl": "/img/bigmac/13"
 *      }
 * @apiError ConnectionLogNotFound The id of one or more ConnectionLogs were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ConnectionLogs were not found"
 *     }
 */

router.route('/connectionLog/:connectionLog_ids')
	.get(authenticateJWT, function (req, res) {
		const ids = req.params.connectionLog_ids.split(',');
		ConnectionLog.find().where('_id').in(ids).exec((err, connectionLogs) => {
			if (err)
				res.status(404).json({ message: "ConnectionLogs were not found" });
			else
				res.json(connectionLogs);
		});
	})
//#endregion
//#region PutConnectionLogById
/**
* @api {put} /connectionLog/:connectionLog_id Update ConnectionLog Information
* @apiVersion 1.0.0
* @apiName PutConnectionLogs
* @apiGroup ConnectionLogs
*
* @apiSuccess {String} name Name of the ConnectionLog.
* @apiSuccess {String} price Price of the ConnectionLog.
* @apiSuccess {String} description Description of the ConnectionLog.
* @apiSuccess {String} imgUrl ImgUrl of the ConnectionLog.
* @apiSuccess {Array} articles Articles array of the ConnectionLog
*
* @apiError ConnectionLogNotUpdated ConnectionLog couldn't be updated.
*/

router.route('/connectionLog/:connectionLog_id').put(authenticateJWT, function (req, res) {
	ConnectionLog.findById(req.params.connectionLog_id, function (err, connectionLog) {
		if (err) {
			res.send(err);
		}
		connectionLog.name = req.body.name;
		connectionLog.price = req.body.price;
		connectionLog.description = req.body.description;
		connectionLog.imgUrl = req.body.imgUrl;
		connectionLog.articles = req.body.articles;
		connectionLog.save(function (err) {
			if (err)
				res.status(404).json({ message: "ConnectionLog couldn't be updated" });
			else
				res.json({ message: 'Updated connectionLog' });
		});
	});
})
	//#endregion
	//#region DeleteConnectionLogById
	/**
	* @api {delete} /connectionLog/:connectionLog_id Delete ConnectionLog Information
	* @apiVersion 1.0.0
	* @apiName DeleteConnectionLogs
	* @apiGroup ConnectionLogs
	*
	* @apiSuccess {String} name Name of the ConnectionLog.
	* @apiSuccess {String} price Price of the ConnectionLog.
	* @apiSuccess {String} description Description of the ConnectionLog.
	* @apiSuccess {String} imgUrl ImgUrl of the ConnectionLog.
	* @apiSuccess {Array} articles Articles array of the ConnectionLog
	*
	* @apiError ConnectionLogNotDeleted ConnectionLog couldn't be deleted.
	*/
	.delete(authenticateJWT, function (req, res) {

		ConnectionLog.remove({ _id: req.params.connectionLog_id }, function (err, connectionLog) {
			if (err) {
				res.status(404).json({ message: "ConnectionLog couldn't be deleted" });
			}
			else {
				res.json({ message: "Deleted ConnectionLog" });
			}
		});
	});
//#endregion
module.exports = router;