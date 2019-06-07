var catModel = require('../models/cat.models');

module.exports = (req, res, next) => {
    catModel.subCatbyCat().then(rows => {
     res.locals.lcCategories = rows;
     next();
  });
  
}