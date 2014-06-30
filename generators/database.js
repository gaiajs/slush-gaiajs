var Promise = require('bluebird'),
    install = require('gulp-install'),
    fs = require('fs'),
    log = require('../lib/log'),
    conflict = require('gulp-conflict'),
    utils = require('../lib/utils'),
    synchro = utils.synchro;

Promise.promisifyAll(fs);

module.exports = function(gulp) {
  gulp.task('database',function (){
    return new Promise(function(resolve, reject) {
      utils.isGaiaProject()
        .then(function() {
          return utils.getPKG();
        })
        .then(function(pkg) {
          return addDatabase(pkg);
        })
        .then(function() {
          return installDriver(gulp);
        })
        .then(function() {
          return databaseConfigExist()
            .then(function(exist) {
              if (!exist) return copyDatabaseConfig(gulp);
              return;
            });
        })
        .then(function(){
          return resolve();
        })
        .catch(function (error) {
          log.error(error);
          reject(error);
        });
    });
  });

  return gulp;
};

function addDatabase(pkg) {
  log.info("add database driver");
  var v = utils.addPkgVersions({});
  pkg.dependencies["gaiajs-driver-mongoose"] = v.versionsPkg.gaiajsDriverMongoose;
  return fs.writeFileAsync(process.cwd() + '/package.json', JSON.stringify(pkg, null, '\t'));
}

function installDriver(gulp) {
  log.info("install database driver");
  return new Promise(function(resolve, reject) {
    gulp.src('./package.json')
      .pipe(install())
      .pipe(synchro(resolve));
  });
}


function databaseConfigExist() {
  log.info("Test if config exist");
  return fs.existsAsync(process.cwd() + '/config/development/database.js');
}

function copyDatabaseConfig(gulp){
  log.info("copy database config");
  return new Promise(function(resolve, reject) {
    gulp.src(__dirname + '/../templates/database/**')
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(synchro(resolve));
  });
};
