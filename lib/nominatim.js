var request = require('request'),
    TQueue = require('tqueue');

var defaults = {
  addressdetails: 1,
  limit: 3,
  format: 'json'
};

var queue = new TQueue({delay: 1000});
var base_url = 'http://nominatim.openstreetmap.org/'
var search_url = base_url + 'search?';
var reverse_url = base_url + 'reverse?';

function Nominatim() {

};

queue.on('pop', function(item) {  
  request({
    url: item.url,
    qs: item.options,
    json: true,
    headers: {
      'User-Agent': 'request' // Needed, as indicated in OSM Nominatim usage policy
    }
  }, function(err, res, results) {
    item.callback(err, item.options, results);  
  });
});

Nominatim.defaults = function(options) {
  if(!options) {
    return defaults;
  } else {
    defaults = extend(options);
  }
};

Nominatim.search = function(options, callback) {
  var opts = extend(options);

  queue.push({url: search_url, options: options, callback: callback});
};

Nominatim.reverse = function(options, callback) {
  var opts = extend(options);

  queue.push({url: reverse_url, options: opts, callback: callback});
};

var extend = function(options) {
  for (var i in defaults) {
    if (!options[i]) {
      options[i] = defaults[i];
    }
  }

  return options;
};

module.exports = Nominatim;
