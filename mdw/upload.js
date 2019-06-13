var multer = require('multer');

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, req.newid)
  },
  destination: function (req, file, cb) {
    cb(null, `./public/imgs/` + req.newid);
  },
})

module.exports = function (app) {
  app.post('/upload', (req, res, next) => {
    multer({ storage }).array('input-b2')(req, res, err => {
      if (err) {
        return res.json({
          error: err.message
        })
      }

      res.json({

      });
    })
  })
}