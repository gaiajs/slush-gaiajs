var gulp = require('gulp'),
    fs = require('fs');

fs.readdirSync(__dirname  + '/generators').forEach(function(file){
  gulp = require(__dirname  + '/generators/' + file)(gulp);
});