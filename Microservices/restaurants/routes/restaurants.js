const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var restaurantSchema = mongoose.Schema({
	name: String,
	price: String,
	description: String,
	imgUrl: String,
	articles: Array
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
 * @apiSuccess {String} price Price of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} imgUrl ImgUrl of the Restaurant.
 * @apiSuccess {Array} articles Articles array of the Restaurant.
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
 *		"name": "BigMacRestaurant",
 *		"price": "12",
 *		"description": "Good restaurant",
 *		"imgUrl": "/img/bigmac/13"
 *      },
 *      {
 *		 "_id": "62b02a1a13dcbfe08casb704",
 *		 "articles": [
 *		     5,
 *		     754,
 *		     1
 *		],
 *		"name": "CheeseBBQRestaurant",
 *		"price": "15",
 *		"description": "Best restaurant",
 *		"imgUrl": "/img/Cheese/BBQ/13"
 *      }
 *      
 * @apiError RestaurantsNotAccessible Restaurants were unaccessible.
 *
 */
/* GET Restaurants. */
router.route('/restaurants')

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
* @apiSuccess {String} price Price of the Restaurant.
* @apiSuccess {String} description Description of the Restaurant.
* @apiSuccess {String} imgUrl ImgUrl of the Restaurant.
* @apiSuccess {Array} articles Articles array of the Restaurant.
*
* @apiError RestaurantNotCreated Restaurant couldn't be created.
*/

/* POST Restaurants. */
router.route('/restaurant').post(authenticateJWT, function (req, res, next) {
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
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {String} price Price of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} imgUrl ImgUrl of the Restaurant.
 * @apiSuccess {Array} articles Articles array of the Restaurant.
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
 *		"name": "BigMacRestaurant",
 *		"price": "12",
 *		"description": "Good restaurant",
 *		"imgUrl": "/img/bigmac/13"
 *      }
 * @apiError RestaurantNotFound The id of one or more Restaurants were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Restaurants were not found"
 *     }
 */

router.route('/restaurant/:restaurant_ids')
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
*
* @apiSuccess {String} name Name of the Restaurant.
* @apiSuccess {String} price Price of the Restaurant.
* @apiSuccess {String} description Description of the Restaurant.
* @apiSuccess {String} imgUrl ImgUrl of the Restaurant.
* @apiSuccess {Array} articles Articles array of the Restaurant
*
* @apiError RestaurantNotUpdated Restaurant couldn't be updated.
*/

router.route('/restaurant/:restaurant_id').put(authenticateJWT, function (req, res) {
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
	*
	* @apiSuccess {String} name Name of the Restaurant.
	* @apiSuccess {String} price Price of the Restaurant.
	* @apiSuccess {String} description Description of the Restaurant.
	* @apiSuccess {String} imgUrl ImgUrl of the Restaurant.
	* @apiSuccess {Array} articles Articles array of the Restaurant
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