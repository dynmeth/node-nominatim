var nominatim = require('..');

nominatim.search({ q: 'Adelaide, 5000, South Australia, Australia'}, function(err, opts, results) {
  var item = results[0];
  console.log(results);
  nominatim.reverse({ lat: item.lat, lon: item.lon }, function(err, opts, results) {
  	console.log(results);
  });
});