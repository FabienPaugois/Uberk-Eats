const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());

const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var notificationSchema = mongoose.Schema({
	userId: Number,
	content: String,
	title: String,
	createdAt: Date,
	hasBeenRead: Boolean
});

var Notification = mongoose.model('Notifications', notificationSchema);

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

//#region GetUserNotifications 

/**
 * @api {get} /:userId Request all userNotifications informations
 * @apiName GetUserNotifications
 * @apiGroup Notifications
 * 
 * @apiParam {string} userId User unique ID
 *
 * @apiSuccess {Number} userId Id of the User.
 * @apiSuccess {String}  content Content of the Notification.
 * @apiSuccess {String} title Title of the Notification.
 * @apiSuccess {Date} createdAt Date of the Notification Creation.
 * @apiSuccess {Boolean} hasBeenRead ReadState of the Notification.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		 "userId":263,
 *		 "title": "Your Order is ready",
 *		 "content": "A deliveryman is going to pick it up at the restaurant",
 *		 "createdAt": "24/05/2022",
 *		 "hasBeenRead": true,
 *     }
 *      
 * @apiError NotificationsNotAccessible Notifications were unaccessible.
 *
 */
/* GET Notifications. */
router.route('/:userId')
	.get(authenticateJWT, function (req, res, next) {
		Notification.find(({ 'userId': { $eq: req.params.userId } })).exec((err, notifications) => {
			if (err) 
				res.send(err);
			else 
				res.json(notifications);
		})
	})
//#endregion


//#region GetUserUnreadNotifications 

/**
 * @api {get} /:userId Request all Unread userNotifications informations
 * @apiName GetUserNotifications
 * @apiGroup Notifications
 * 
 * @apiParam {string} userId User unique ID
 *
 * @apiSuccess {Number} userId Id of the User.
 * @apiSuccess {String}  content Content of the Notification.
 * @apiSuccess {String} title Title of the Notification.
 * @apiSuccess {Date} createdAt Date of the Notification Creation.
 * @apiSuccess {Boolean} hasBeenRead ReadState of the Notification.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		 "userId":263,
 *		 "title": "Your Order is ready",
 *		 "content": "A deliveryman is going to pick it up at the restaurant",
 *		 "createdAt": "24/05/2022",
 *		 "hasBeenRead": false,
 *     }
 *      
 * @apiError NotificationsNotAccessible Notifications were unaccessible.
 *
 */
/* GET Notifications. */
router.route('/unread/:userId')
	.get(authenticateJWT, function (req, res, next) {
		Notification.find(({ 'userId': { $eq: req.params.userId }, 'hasBeenRead': { $eq: false } })).exec((err, notifications) => {
			if (err)
				res.send(err);
			else
				res.json(notifications);
		})
	})
//#endregion

//#region PostNotification
/**
* @api {post} /notification/ Create Notification Information
* @apiVersion 1.0.0
* @apiName PostNotification
* @apiGroup Notifications
*
* @apiSuccess {Number} userId Id of the User.
* @apiSuccess {String}  content Content of the Notification.
* @apiSuccess {String} title Title of the Notification.
* @apiSuccess {Date} createdAt Date of the Notification Creation.
* @apiSuccess {Boolean} hasBeenRead ReadState of the Notification.
*
* @apiError NotificationNotCreated Notification couldn't be created.
*/

/* POST Notifications. */
router.route('/').post(authenticateJWT, function (req, res, next) {
	// Nous utilisons le schéma Notification
	var notification = new Notification();
	// Nous récupérons les données reçues pour les ajouter à l'objet Notification
	notification.userId = req.body.userId;
	notification.content = req.body.content;
	notification.title = req.body.title;
	notification.createdAt = req.body.createdAt;
	notification.hasBeenRead = req.body.hasBeenRead;
	console.log(notification);
	//Nous stockons l'objet en base
	notification.save(function (err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(notification);
		}
	});
});
//#endregion


//#region PutNotifications
/**
* @api {post} /notification/markAsRead 
* @apiVersion 1.0.0
* @apiName PutNotification
* @apiGroup Notifications
*
* @apiSuccess {Number} userId Id of the User.
* @apiSuccess {String}  content Content of the Notification.
* @apiSuccess {String} title Title of the Notification.
* @apiSuccess {Date} createdAt Date of the Notification Creation.
* @apiSuccess {Boolean} hasBeenRead ReadState of the Notification.
*
* @apiError NotificationNotUpdated Notification couldn't be updated.
*/

/* PUT Notifications. */
router.route('/markAsRead/:userId').put(authenticateJWT, function (req, res, next) {
	console.log(req.params.userId);
	Notification.updateMany(
		{ 'userId': { $eq: req.params.userId } },
		{ $set: { 'hasBeenRead': true } },
		{ "multi": true },
		(err, writeResult) => {
			if (err)
				res.send(err);
			else
				res.json(writeResult)
		}
	)
	
});
//#endregion

module.exports = router;
