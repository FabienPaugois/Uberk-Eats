const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var menuSchema = mongoose.Schema({
	name: String,
	price: String,
	description: String,
	imgUrl: String,
	articles: Array
});

var Menu = mongoose.model('Menus', menuSchema);


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

//#region GetAllMenus

/**
 * @api {get} /menus Request all Menus information
 * @apiName GetMenus
 * @apiGroup Menus
 *
 * @apiSuccess {String} name Name of the Menu.
 * @apiSuccess {String} price Price of the Menu.
 * @apiSuccess {String} description Description of the Menu.
 * @apiSuccess {String} imgUrl ImgUrl of the Menu.
 * @apiSuccess {Array} articles Articles array of the Menu.
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
 *		"name": "BigMacMenu",
 *		"price": "12",
 *		"description": "Good menu",
 *		"imgUrl": "/img/bigmac/13"
 *      },
 *      {
 *		 "_id": "62b02a1a13dcbfe08casb704",
 *		 "articles": [
 *		     5,
 *		     754,
 *		     1
 *		],
 *		"name": "CheeseBBQMenu",
 *		"price": "15",
 *		"description": "Best menu",
 *		"imgUrl": "/img/Cheese/BBQ/13"
 *      }
 *      
 * @apiError MenusNotAccessible Menus were unaccessible.
 *
 */

/* GET Menus. */
router.route('/menus')

	.get(authenticateJWT, function (req, res, next) {
		Menu.find(function (err, menus) {
			if (err) {
				res.send(err);
			}
			res.json(menus);
		})
	})
//#endregion

//#region PostMenu
/**
* @api {post} /menu/ Create Menu Information
* @apiVersion 1.0.0
* @apiName PostMenu
* @apiGroup Menus
*
* @apiSuccess {String} name Name of the Menu.
* @apiSuccess {String} price Price of the Menu.
* @apiSuccess {String} description Description of the Menu.
* @apiSuccess {String} imgUrl ImgUrl of the Menu.
* @apiSuccess {Array} articles Articles array of the Menu.
*
* @apiError MenuNotCreated Menu couldn't be created.
*/

/* POST Menus. */
	// Nous utilisons le schéma Menu
	var menu = new Menu();
	// Nous récupérons les données reçues pour les ajouter à l'objet Menu
	menu.name = req.body.name;
	menu.price = req.body.price;
	menu.description = req.body.description;
	menu.imgUrl = req.body.imgUrl;
	menu.articles = req.body.articles;
	//Nous stockons l'objet en base
	menu.save(function (err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Created");
		}
	});
});
//#endregion

//#region GetMenusById
/**
 * @api {get} /menu/:menu_ids Request Menus information
 * @apiName GetMenu
 * @apiGroup Menu
 *
* @apiParam {string} menu_ids List of Menu unique IDs, separated by commas.
 *
 * @apiSuccess {String} name Name of the Menu.
 * @apiSuccess {String} price Price of the Menu.
 * @apiSuccess {String} description Description of the Menu.
 * @apiSuccess {String} imgUrl ImgUrl of the Menu.
 * @apiSuccess {Array} articles Articles array of the Menu.
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
 *		"name": "BigMacMenu",
 *		"price": "12",
 *		"description": "Good menu",
 *		"imgUrl": "/img/bigmac/13"
 *      }
 * @apiError MenuNotFound The id of one or more Menus were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Menus were not found"
 *     }
 */

router.route('/menu/:menu_ids')
		const ids = req.params.menu_ids.split(',');
		Menu.find().where('_id').in(ids).exec((err, menus) => {
			if (err)
				res.status(404).json({ message: "Menus were not found" });
			else
				res.json(menus);
		});
	})
//#endregion

//#region PutMenuById
/**
* @api {put} /menu/:menu_id Update Menu Information
* @apiVersion 1.0.0
* @apiName PutMenus
* @apiGroup Menus
*
* @apiSuccess {String} name Name of the Menu.
* @apiSuccess {String} price Price of the Menu.
* @apiSuccess {String} description Description of the Menu.
* @apiSuccess {String} imgUrl ImgUrl of the Menu.
* @apiSuccess {Array} articles Articles array of the Menu
*
* @apiError MenuNotUpdated Menu couldn't be updated.
*/

	Menu.findById(req.params.menu_id, function (err, menu) {
		if (err) {
			res.send(err);
		}
		menu.name = req.body.name;
		menu.price = req.body.price;
		menu.description = req.body.description;
		menu.imgUrl = req.body.imgUrl;
		menu.articles = req.body.articles;
		menu.save(function (err) {
			if (err)
				res.status(404).json({ message: "Menu couldn't be updated" });
			else
				res.json({ message: 'Updated menu' });
		});
	});
})
	//#endregion

	//#region DeleteMenuById
	/**
	* @api {delete} /menu/:menu_id Delete Menu Information
	* @apiVersion 1.0.0
	* @apiName DeleteMenus
	* @apiGroup Menus
	*
	* @apiSuccess {String} name Name of the Menu.
	* @apiSuccess {String} price Price of the Menu.
	* @apiSuccess {String} description Description of the Menu.
	* @apiSuccess {String} imgUrl ImgUrl of the Menu.
	* @apiSuccess {Array} articles Articles array of the Menu
	*
	* @apiError MenuNotDeleted Menu couldn't be deleted.
	*/

		Menu.remove({ _id: req.params.menu_id }, function (err, menu) {
			if (err) {
				res.status(404).json({ message: "Menu couldn't be deleted" });
			}
			else {
				res.json({ message: "Deleted Menu" });
			}
		});

	});
//#endregion

module.exports = router;