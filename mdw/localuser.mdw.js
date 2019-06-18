module.exports = (req, res, next) => {
    if(req.user){
      res.locals.isAuthed=true;
      res.locals.localuserName=req.user;
    }
  next();
  }