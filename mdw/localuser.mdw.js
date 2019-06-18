module.exports = (req, res, next) => {
    if (req.username) {
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.username;
    }
    next();
  }