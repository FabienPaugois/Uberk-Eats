const express = require("express")
var router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
const accessTokenSecret = 'a23f5zddoznJFGZBiGbIg895FZK';

var articleSchema = mongoose.Schema({
	name: String,
	price: String,
	description: String,
	imageUrl: String
});

var Article = mongoose.model('Articles', articleSchema);


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

//#region GetAllArticles

/**
 * @api {get} /articles Request all Articles information
 * @apiName GetArticles
 * @apiGroup Articles
 *
 * @apiSuccess {String} name Name of the Article.
 * @apiSuccess {String} price Price of the Article.
 * @apiSuccess {String} description Description of the Article.
 * @apiSuccess {String} imgUrl ImgUrl of the Article.
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
 *		"name": "BigMacArticle",
 *		"price": "12",
 *		"description": "Good article",
 *		"imgUrl": "/img/bigmac/13"
 *      },
 *      {
 *		 "_id": "62b02a1a13dcbfe08casb704",
 *		"name": "CheeseBBQArticle",
 *		"price": "15",
 *		"description": "Best article",
 *		"imgUrl": "/img/Cheese/BBQ/13"
 *      }
 *      
 * @apiError ArticlesNotAccessible Articles were unaccessible.
 *
 */
/* GET Articles. */
router.route('/')

	.get(authenticateJWT, function (req, res, next) {
		Article.find(function (err, articles) {
			if (err) {
				res.send(err);
			}
			res.json(articles);
		})
	})
//#endregion
//#region PostArticle
/**
* @api {post} /article/ Create Article Information
* @apiVersion 1.0.0
* @apiName PostArticle
* @apiGroup Articles
*
* @apiSuccess {String} name Name of the Article.
* @apiSuccess {String} price Price of the Article.
* @apiSuccess {String} description Description of the Article.
* @apiSuccess {String} imgUrl ImgUrl of the Article.
*
* @apiError ArticleNotCreated Article couldn't be created.
*/

/* POST Articles. */
router.route('/').post(authenticateJWT, function (req, res, next) {
	// Nous utilisons le schéma Article
	var article = new Article();
	// Nous récupérons les données reçues pour les ajouter à l'objet Article
	article.name = req.body.name;
	article.price = req.body.price;
	article.description = req.body.description;
	article.imageUrl = req.body.imageUrl;
	article.articles = req.body.articles;
	//Nous stockons l'objet en base
	article.save(function (err) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(article);
		}
	});
});
//#endregion
//#region GetArticlesById
/**
 * @api {get} /article/:article_ids Request Articles information
 * @apiName GetArticle
 * @apiGroup Article
 *
* @apiParam {string} article_ids List of Article unique IDs, separated by commas.
 *
 * @apiSuccess {String} name Name of the Article.
 * @apiSuccess {String} price Price of the Article.
 * @apiSuccess {String} description Description of the Article.
 * @apiSuccess {String} imgUrl ImgUrl of the Article.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *		 "_id": "62b02a1a13dcbfe08b8db704",
 *		"name": "BigMacArticle",
 *		"price": "12",
 *		"description": "Good article",
 *		"imgUrl": "/img/bigmac/13"
 *      }
 * @apiError ArticleNotFound The id of one or more Articles were not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Articles were not found"
 *     }
 */

router.route('/:article_ids')
	.get(authenticateJWT, function (req, res) {
		const ids = req.params.article_ids.split(',');
		Article.find().where('_id').in(ids).exec((err, articles) => {
			if (err)
				res.status(404).json({ message: "Articles were not found" });
			else
				res.json(articles);
		});
	})
//#endregion
//#region PutArticleById
/**
* @api {put} /article/:article_id Update Article Information
* @apiVersion 1.0.0
* @apiName PutArticles
* @apiGroup Articles
*
* @apiSuccess {String} name Name of the Article.
* @apiSuccess {String} price Price of the Article.
* @apiSuccess {String} description Description of the Article.
* @apiSuccess {String} imgUrl ImgUrl of the Article.
*
* @apiError ArticleNotUpdated Article couldn't be updated.
*/

router.route('/:article_id').put(authenticateJWT, function (req, res) {
	Article.findById(req.params.article_id, function (err, article) {
		if (err) {
			res.send(err);
		}
		article.name = req.body.name;
		article.price = req.body.price;
		article.description = req.body.description;
		article.imageUrl = req.body.imageUrl;
		article.save(function (err) {
			if (err)
				res.status(404).json({ message: "Article couldn't be updated" });
			else
				res.status(200).json({ message: 'Updated article', article: article });
		});
	});
})
	//#endregion
	//#region DeleteArticleById
	/**
	* @api {delete} /article/:article_id Delete Article Information
	* @apiVersion 1.0.0
	* @apiName DeleteArticles
	* @apiGroup Articles
	*
	* @apiSuccess {String} name Name of the Article.
	* @apiSuccess {String} price Price of the Article.
	* @apiSuccess {String} description Description of the Article.
	* @apiSuccess {String} imgUrl ImgUrl of the Article.
	*
	* @apiError ArticleNotDeleted Article couldn't be deleted.
	*/
	.delete(authenticateJWT, function (req, res) {

		Article.remove({ _id: req.params.article_id }, function (err, article) {
			if (err) {
				res.status(404).json({ message: "Article couldn't be deleted" });
			}
			else {
				res.json({ message: "Deleted Article" });
			}
		});
	});
//#endregion
module.exports = router;