const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var orderSchema = mongoose.Schema({
	clientId: Number,
	deliveryAddress: String,
	deliverymanId: Number,
	restaurantId: Number,
	status: Number,
	timestamp: Object,
	menus: Object,
	articles: Object
});

var Order = mongoose.model('Orders', orderSchema);


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

//#region GetAllOrders

/**
 * @api {get} /orders Request all Orders information
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiSuccess {Number} clientId Id of the User who ordered.
 * @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
 * @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
 * @apiSuccess {Number} restaurantId RestaurantId of the Order.
 * @apiSuccess {Number} status Status of the Order.
 * @apiSuccess {Object} timestamp Timestamp object of the Order.
 * @apiSuccess {Object} menus Menus object of the Order.
 * @apiSuccess {Object} articles Articles object of the Order.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		 "clientId": 12,
 *		 "deliverAdress": "10 Downing Street ",
 *		 "deliverymanId": 2547,
 *		 "restaurantId": 147,
 *		 "status": 2,
 *		 "timestamp": {
 *			"createdAt": Number,
 *			"pickedUpAt": Number,
 *			"deliveredAt": Number,
 *			"readyAt": Number
 *		 },
 *		 "products": {
 *			
 *		 }
 *     }
 *      
 * @apiError OrdersNotAccessible Orders were unaccessible.
 *
 */
/* GET Orders. */
router.route('/')

	.get(authenticateJWT, function (req, res, next) {
		Order.find(function (err, orders) {
			if (err) {
				res.send(err);
			}
			res.json(orders);
		})
	})
//#endregion
//#region PostOrder
/**
* @api {post} /order/ Create Order Information
* @apiVersion 1.0.0
* @apiName PostOrder
* @apiGroup Orders
*
* @apiSuccess {Number} clientId Id of the User who ordered.
* @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
* @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
* @apiSuccess {Number} restaurantId RestaurantId of the Order.
* @apiSuccess {Number} status Status of the Order.
* @apiSuccess {Object} timestamp Timestamp object of the Order.
* @apiSuccess {Object} menus Menus object of the Order.
* @apiSuccess {Object} articles Articles object of the Order.
*
* @apiError OrderNotCreated Order couldn't be created.
*/

/* POST Orders. */
router.route('/').post(authenticateJWT, function (req, res, next) {
	// Nous utilisons le schéma Order
	var order = new Order();
	// Nous récupérons les données reçues pour les ajouter à l'objet Order
	order.clientId = req.body.clientId;
	order.deliveryAddress = req.body.deliveryAddress;
	order.deliverymanId = req.body.deliverymanId;
	order.restaurantId = req.body.restaurantId;
	order.status = req.body.status;
	order.timestamp = req.body.timestamp;
	order.menus = req.body.menus;
	order.articles = req.body.articles;
	//Nous stockons l'objet en base
	order.save(function (err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(order);
		}
	});
});
//#endregion
//#region GetOrdersById
/**
 * @api {get} /order/:order_ids Request Orders information
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiParam {string} order_ids List of Order unique IDs, separated by commas.
 *
 * @apiSuccess {Number} clientId Id of the User who ordered.
 * @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
 * @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
 * @apiSuccess {Number} restaurantId RestaurantId of the Order.
 * @apiSuccess {Number} status Status of the Order.
 * @apiSuccess {Object} timestamp Timestamp object of the Order.
 * @apiSuccess {Object} menus Menus object of the Order.
 * @apiSuccess {Object} articles Articles object of the Order.
 *
 * @apiError OrderNotFound The id of one or more Orders were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Orders were not found"
 *     }
 */

router.route('/orderids/:order_ids')
	.get(authenticateJWT, function (req, res) {
		const ids = req.params.order_ids.split(',');
		Order.find().where('_id').in(ids).exec((err, orders) => {
			if (err)
				res.status(404).json({ message: "Orders were not found" });
			else
				res.json(orders);
		});
	})
//#endregion

//#region GetFreeOrders for deliverymens
/**
 * @api {get} /order/:order_ids Request Orders information
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiSuccess {Number} clientId Id of the User who ordered.
 * @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
 * @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
 * @apiSuccess {Number} restaurantId RestaurantId of the Order.
 * @apiSuccess {Number} status Status of the Order.
 * @apiSuccess {Object} timestamp Timestamp object of the Order.
 * @apiSuccess {Object} menus Menus object of the Order.
 * @apiSuccess {Object} articles Articles object of the Order.
 *
 * @apiError OrderNotFound The id of one or more Orders were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Orders were not found"
 *     }
 */

router.route('/freeOrders')
	.get(authenticateJWT, function (req, res) {
		Order.find({ 'status': { $eq: 2 } }).exec((err, orders) => {
			if (err)
				res.status(404).json({ message: "Orders were not found" });
			else
				res.json(orders);
		});
	})
//#endregion

//#region GetOrders for deliveryMan
/**
 * @api {get} /order/:deliveryManId Request Orders information
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiParam {string} deliveryManId Order unique ID
 *
 * @apiSuccess {Number} clientId Id of the User who ordered.
 * @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
 * @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
 * @apiSuccess {Number} restaurantId RestaurantId of the Order.
 * @apiSuccess {Number} status Status of the Order.
 * @apiSuccess {Object} timestamp Timestamp object of the Order.
 * @apiSuccess {Object} menus Menus object of the Order.
 * @apiSuccess {Object} articles Articles object of the Order.
 *
 * @apiError OrderNotFound The id of one or more Orders were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Orders were not found"
 *     }
 */

router.route('/deliveryman/:deliveryManId')
	.get(authenticateJWT, function (req, res) {
		Order.find({ 'deliverymanId': { $eq: req.params.deliveryManId } }).exec((err, orders) => {
			if (err)
				res.status(404).json({ message: "Orders were not found" });
			else
				res.json(orders);
		});
	})
//#endregion

//#region PutOrderById
/**
* @api {put} /order/:order_id Update Order Information
* @apiVersion 1.0.0
* @apiName PutOrders
* @apiGroup Orders
* @apiSuccess {Number} clientId Id of the User who ordered.
* @apiSuccess {String} deliveryAddress DeliverAdress of the Order.
* @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
* @apiSuccess {Number} restaurantId RestaurantId of the Order.
* @apiSuccess {Number} status Status of the Order.
* @apiSuccess {Object} timestamp Timestamp object of the Order.
* @apiSuccess {Object} menus Menus object of the Order.
* @apiSuccess {Object} articles Articles object of the Order.
*
* @apiError OrderNotUpdated Order couldn't be updated.
*/

router.route('/:order_id').put(authenticateJWT, function (req, res) {
	Order.findById(req.params.order_id, function (err, order) {
		if (err) {
			res.send(err);
		}
		order.name = req.body.name;
		order.price = req.body.price;
		order.description = req.body.description;
		order.imgUrl = req.body.imgUrl;
		order.articles = req.body.articles;
		order.save(function (err) {
			if (err)
				res.status(404).json({ message: "Order couldn't be updated" });
			else
				res.json({ message: 'Updated order' });
		});
	});
})
	//#endregion
	//#region DeleteOrderById
	/**
	* @api {delete} /order/:order_id Delete Order Information
	* @apiVersion 1.0.0
	* @apiName DeleteOrders
	* @apiGroup Orders
	*
	* @apiSuccess {Number} clientId Id of the User who ordered.
	* @apiSuccess {String} deliverAdress DeliverAdress of the Order.
	* @apiSuccess {Number} deliverymanId DeliverymanId of the Order.
	* @apiSuccess {Number} restaurantId RestaurantId of the Order.
	* @apiSuccess {Number} status Status of the Order.
	* @apiSuccess {Object} timestamp Timestamp object of the Order.
	* @apiSuccess {Object} menus Menus object of the Order.
 	* @apiSuccess {Object} articles Articles object of the Order.
	*
	* @apiError OrderNotDeleted Order couldn't be deleted.
	*/
	.delete(authenticateJWT, function (req, res) {

		Order.remove({ _id: req.params.order_id }, function (err, order) {
			if (err) {
				res.status(404).json({ message: "Order couldn't be deleted" });
			}
			else {
				res.json({ message: "Deleted Order" });
			}
		});
	});
//#endregion
module.exports = router;
