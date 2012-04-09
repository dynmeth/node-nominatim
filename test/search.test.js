var nominatim = require('..');

nominatim.search({ q: 'Adelaide, 5000, South Australia, Australia'}, function(err, opts, results) {
  console.log(results);
});
