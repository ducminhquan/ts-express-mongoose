import { Router, Request, Response } from "express";
import { Article } from "../models/index";

export class HomeRouter {

  private router: Router = Router();

  getRouter(): Router {

    this.router.get("/", async (req: Request, res: Response) => {
      console.log('123');

      const articles = await Article.find({}).exec();

      res.render('index', {
        title: 'Generator-Express MVC',
        articles: articles
      });


      // res.json(articles)
    });

    return this.router;
  }
}

// module.exports = function (app) {
//   app.use('/', router);
// };

// router.get('/', function (req, res, next) {
//   Article.find(function (err, articles) {
//     if (err) return next(err);
//     res.render('index', {
//       title: 'Generator-Express MVC',
//       articles: articles
//     });
//   });
// });
