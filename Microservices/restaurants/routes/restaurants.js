const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var restaurantSchema = mongoose.Schema({
	name: String,
	types: Array,
	address: String,
	ownerId: Number,
	description: String,
	phone: String,
	url: String,
	products: Object,
	imageUrl: String
});

var Restaurant = mongoose.model('Restaurants', restaurantSchema);

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

//#region GetAllRestaurants

/**
 * @api {get} /restaurants Request all Restaurants information
 * @apiName GetRestaurants
 * @apiGroup Restaurants
 *
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {Array}  types Types of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Number} ownerId userId of the Restaurant Owner.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} url Url of the Restaurant website.
 * @apiSuccess {String} imageUrl imageUrl of the Restaurant.
 * @apiSuccess {Object} products Products Object of the Restaurant.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		"name": "BeurkMacRestaurant",
 *		 "types": [
 *		     "Indian",
 *		     "Burger"
 *		],
 *		"address": "1 Rotten Street",
 *		"ownerId": 23,
 *		"description": "Bad restaurant",
 *		"url": "http://badrestaurant/img/beurkmac/13"
 *		"imgUrl": "/img/bigmac/13",
 *		"products": {
 *			"articles": [
 *				12,
 *				3
 *			],
 *			"menus": [
 *				56,
 *				8
 *			]
 *		}
 *     },
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		"name": "BeurkMacRestaurant2",
 *		 "types": [
 *		     "Chinese",
 *		     "Gastronomic"
 *		],
 *		"address": "2 Rotten Street",
 *		"ownerId": 28,
 *		"description": "Bad restaurant",
 *		"url": "http://badrestaurant/img/beurkmac/15"
 *		"imgUrl": "/img/bigmac/12",
 *		"products": {
 *			"articles": [
 *				5856,
 *				125
 *			],
 *			"menus": [
 *				41876,
 *				14
 *			]
 *		}
 *     }
 *      
 * @apiError RestaurantsNotAccessible Restaurants were unaccessible.
 *
 */
/* GET Restaurants. */
router.route('/')

	.get(authenticateJWT, function (req, res, next) {
		Restaurant.find(function (err, restaurants) {
			if (err) {
				res.send(err);
			}
			res.json(restaurants);
		})
	})
//#endregion
//#region PostRestaurant
/**
* @api {post} /restaurant/ Create Restaurant Information
* @apiVersion 1.0.0
* @apiName PostRestaurant
* @apiGroup Restaurants
*
* @apiSuccess {String} name Name of the Restaurant.
* @apiSuccess {Array}  types Types of the Restaurant.
* @apiSuccess {String} address Address of the Restaurant.
* @apiSuccess {Number} ownerId userId of the Restaurant Owner.
* @apiSuccess {String} description Description of the Restaurant.
* @apiSuccess {String} url Url of the Restaurant website.
* @apiSuccess {String} imgUrl imgUrl of the Restaurant.
* @apiSuccess {Object} products Products Object of the Restaurant.
*
*
* @apiError RestaurantNotCreated Restaurant couldn't be created.
*/

/* POST Restaurants. */
router.route('/').post(authenticateJWT, function (req, res, next) {
	// Nous utilisons le schéma Restaurant
	var restaurant = new Restaurant();
	// Nous récupérons les données reçues pour les ajouter à l'objet Restaurant
	restaurant.name = req.body.name;
	restaurant.price = req.body.price;
	restaurant.description = req.body.description;
	restaurant.imgUrl = req.body.imgUrl;
	restaurant.articles = req.body.articles;
	//Nous stockons l'objet en base
	restaurant.save(function (err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Created");
		}
	});
});
//#endregion
//#region GetRestaurantsById
/**
 * @api {get} /restaurant/:restaurant_ids Request Restaurants information
 * @apiName GetRestaurant
 * @apiGroup Restaurant
 *
 * @apiParam {string} restaurant_ids List of Restaurant unique IDs, separated by commas.
 *
 *
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {Array}  types Types of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Number} ownerId userId of the Restaurant Owner.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} url Url of the Restaurant website.
 * @apiSuccess {String} imgUrl imgUrl of the Restaurant.
 * @apiSuccess {Object} products Products Object of the Restaurant.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		"name": "BeurkMacRestaurant",
 *		 "types": [
 *		     "Indian",
 *		     "Burger"
 *		],
 *		"address": "1 Rotten Street",
 *		"ownerId": 23,
 *		"description": "Bad restaurant",
 *		"url": "http://badrestaurant/img/beurkmac/13"
 *		"imgUrl": "/img/bigmac/13",
 *		"products": {
 *			"articles": [
 *				12,
 *				3
 *			],
 *			"menus": [
 *				56,
 *				8
 *			]
 *		}
 *     }
 * @apiError RestaurantNotFound The id of one or more Restaurants were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Restaurants were not found"
 *     }
 */

router.route('/:restaurant_ids')
	.get(authenticateJWT, function (req, res) {
		const ids = req.params.restaurant_ids.split(',');
		Restaurant.find().where('_id').in(ids).exec((err, restaurants) => {
			if (err)
				res.status(404).json({ message: "Restaurants were not found" });
			else
				res.json(restaurants);
		});
	})
//#endregion
//#region PutRestaurantById
/**
* @api {put} /restaurant/:restaurant_id Update Restaurant Information
* @apiVersion 1.0.0
* @apiName PutRestaurants
* @apiGroup Restaurants
*	{
*		 "_id": "62b02a1a13dcbfe08b8db704",
*		"name": "BeurkMacRestaurant",
*		 "types": [
*		     "Indian",
*		     "Burger"
*		],
*		"address": "1 Rotten Street",
*		"ownerId": 23,
*		"description": "Bad restaurant",
*		"url": "http://badrestaurant/img/beurkmac/13"
*		"imgUrl": "/img/bigmac/13",
*		"products": {
*			"articles": [
*				12,
*				3
*			],
*			"menus": [
*				56,
*				8
*			]
*		}
*     }
* @apiError RestaurantNotUpdated Restaurant couldn't be updated.
*/

router.route('/:restaurant_id').put(authenticateJWT, function (req, res) {
	Restaurant.findById(req.params.restaurant_id, function (err, restaurant) {
		if (err) {
			res.send(err);
		}
		restaurant.name = req.body.name;
		restaurant.price = req.body.price;
		restaurant.description = req.body.description;
		restaurant.imgUrl = req.body.imgUrl;
		restaurant.articles = req.body.articles;
		restaurant.save(function (err) {
			if (err)
				res.status(404).json({ message: "Restaurant couldn't be updated" });
			else
				res.json({ message: 'Updated restaurant' });
		});
	});
})
	//#endregion
	//#region DeleteRestaurantById
	/**
	* @api {delete} /restaurant/:restaurant_id Delete Restaurant Information
	* @apiVersion 1.0.0
	* @apiName DeleteRestaurants
	* @apiGroup Restaurants
	*{
	*		 "_id": "62b02a1a13dcbfe08b8db704",
	*		"name": "BeurkMacRestaurant",
	*		 "types": [
	*		     "Indian",
	*		     "Burger"
	*		],
	*		"address": "1 Rotten Street",
	*		"ownerId": 23,
	*		"description": "Bad restaurant",
	*		"url": "http://badrestaurant/img/beurkmac/13"
	*		"imgUrl": "/img/bigmac/13",
	*		"products": {
	*			"articles": [
	*				12,
	*				3
	*			],
	*			"menus": [
	*				56,
	*				8
	*			]
	*		}
	*     }
	*
	* @apiError RestaurantNotDeleted Restaurant couldn't be deleted.
	*/
	.delete(authenticateJWT, function (req, res) {

		Restaurant.remove({ _id: req.params.restaurant_id }, function (err, restaurant) {
			if (err) {
				res.status(404).json({ message: "Restaurant couldn't be deleted" });
			}
			else {
				res.json({ message: "Deleted Restaurant" });
			}
		});
	});
//#endregion
module.exports = router;
