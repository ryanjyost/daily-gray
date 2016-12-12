
var URL = 'mongodb://skoosh:skoosh2016@ds019746.mlab.com:19746/dailygray';
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(URL);

