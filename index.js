(function() {
  var Reddit, app, express;
  express = require('express');
  Reddit = require('./reddit');
  app = express.createServer();
  app.configure(function() {
    app.use(express.static(__dirname + '/public'));
  });
  app.get('/pics/:after?', function(req, res) {
    var after, reddit;
    after = req.params.after;
    reddit = new Reddit().req(after, function(pictures) {
      return res.end(JSON.stringify(pictures));
    });
  });
  app.get('/', function(req, res) {});
  app.listen(process.env.PORT || 3000);
}).call(this);
