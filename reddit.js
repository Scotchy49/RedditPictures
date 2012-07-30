(function() {
  var Reddit, http, simplify, _u;
  http = require('http');
  _u = require('underscore');
  Reddit = function() {
    console.log('requesting reddit...');
    this.req = function(after, callback) {
      return http.get({
        host: 'www.reddit.com',
        port: 80,
        path: "/r/fffffffuuuuuuuuuuuu/.json?after=" + after
      }, function(res) {
        var data;
        data = "";
        res.on('data', function(chunk) {
          return data += chunk;
        });
        return res.on('end', function() {
          return callback(simplify(JSON.parse(data)));
        });
      }).on('error', function(e) {
        return callback(e.message);
      });
    };
    return this;
  };
  simplify = function(redditData) {
    return {
      after: redditData.data.after,
      pictures: _u.filter(_u.map(redditData.data.children, function(child) {
        var pic, url;
        pic = child.data;
        url = pic.url;
        if (url.indexOf('imgur') >= 0) {
          url = url + '.jpg';
        }
        return {
          image: url,
          thumb: pic.thumbnail,
          big: url,
          title: "",
          description: pic.title
        };
      }), function(pic) {
        return pic.image.indexOf('flickr') === -1;
      })
    };
  };
  module.exports = Reddit;
}).call(this);
