var catModel = require('../models/cat.models');

module.exports = (req, res, next) => {
    catModel.allSubCat().then(rows => {
     res.locals.lcSubCategories = rows;
     next();
  });
}