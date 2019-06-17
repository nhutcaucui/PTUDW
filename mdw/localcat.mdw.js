var catModel = require('../models/cat.models');

module.exports = (req, res, next) => {
    catModel.allCat().then(rows => {
     res.locals.lcCategories = rows;
     next();
  });

}