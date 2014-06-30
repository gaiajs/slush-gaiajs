/**
 * Modules dependencies
 */
var install = require('gulp-install'),
    Promise = require('bluebird'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    inquirer = require('inquirer'),
    utils = require('../lib/utils'),
    synchro = utils.synchro,
    mkdirp = utils.mkdirp,
    readdir = require('fs').readdirSync,
    path = require('path'),
    log = require('../lib/log');

module.exports = function(gulp) {
  gulp.task('default',function (){
    var files = readdir(process.cwd());
    if (files && files.length > 0) {
      log.error('Folder is not empty !!!');
      return;
    }
    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your application?',
      default: path.basename(process.cwd()) || 'gaiajs'
    }, {
      name: 'appVersion',
      message: 'What is the version?',
      default: '0.0.1'
    },{
      name: 'appDescription',
      message: 'How would you describe your application?',
      default: 'Full-Stack JavaScript with Gaiajs and koajs'
    }, {
      name: 'appKeywords',
      message: 'How would you describe your application in comma separated key words?',
      default: 'Gaiajs, Koajs, Node.js'
    }, {
      name: 'githubUser',
      message: 'Would you mind telling me your username on GitHub?',
      default: 'someuser'
    }, {
      name: 'port',
      message: 'Which port',
      default: 3000
    }, {
      name: 'locales',
      message: 'Would you use locales ?',
      type: "confirm",
      default: false
    }, {
      name: 'database',
      message: 'Would you use database ?',
      type: "confirm",
      default: false
    }, {
      name: 'addHooks',
      message: 'Would you use hooks ?',
      type: "confirm",
      default: false
    }, {
      name: 'templating',
      message: 'Which templating would you like to use',
      type: 'list',
      default: 0,
      choices: [{
        value: 'jade',
        name: 'jade'
      }, {
        value: 'ejs',
        name: 'ejs'
      }, {
        value: 'handlebars',
        name: 'handlebars'
      }, {
        value: 'none',
        name: 'none'
      }]
    }];

    return new Promise(function(resolve, reject) {
      //Ask
      inquirer.prompt(prompts,
        function (answers) {
          if (!answers.appName) {
            return deferred.resolve();
          }
          answers = utils.addPkgVersions(answers);
          answers.github = false;
          answers.slugifiedAppName = _s.slugify(answers.appName);
          answers.humanizedAppName = _s.humanize(answers.appName);
          answers.capitalizedAppAuthor = _s.capitalize(answers.githubUser);
          answers.hasView = 'none' !== answers.templating;

          utils.getGithubUser(answers.githubUser)
            .then(function(res){
              answers = _.defaults({}, res, answers);
              return copyApp(gulp, answers);
            })
            .then(function(){
              if (answers.database) {
                return copyDatabase(gulp, answers);
              } else {
                return;
              }
            })
            .then(function() {
              if (answers.locales) {
                return copyLocales(gulp, answers);
              } else {
                return;
              }
            }).then(function(){
              var dirs = ['/app/controllers', '/app/filters', '/app/models']
                .map(function(dir) {return mkdirp(dir);});
              return Promise.all(dirs);
            }).then(function(){
              resolve();
            });
        });
    });
  });
	return gulp;
};


function copyApp(gulp, answers) {
  log.info("copy app");
  return new Promise(function(resolve, reject){
    gulp.src(__dirname + '/../templates/app/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .pipe(synchro(resolve));
  });
}

function copyDatabase(gulp, answers){
  log.info("copy database");
  return new Promise(function(resolve, reject) {
    gulp.src(__dirname + '/../templates/database/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(synchro(resolve));
  });
}

function copyLocales(gulp, answers) {
  log.info("copy locales");
  return new Promise(function(resolve, reject) {
    gulp.src(__dirname + '/../templates/locales/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(synchro(resolve));
  });
}
