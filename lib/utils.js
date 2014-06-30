var GitHubApi = require('github'),
    fs = require('fs'),
    Promise = require('bluebird'),
    through2 = require('through2'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    mkdirp = require('mkdirp'),
    mkdirpAsync = Promise.promisify(mkdirp),
    log = require('./log');

Promise.promisifyAll(fs);


var Utils = {};

/**
 * Get github user informations
 */
Utils.getGithubUser = function(username) {
  return new Promise(function(resolve, reject) {
    if ("someuser" === username) {
      setImmediate(function() {
        resolve({});
      });
      return;
    }

    var cb = function (err, responseText) {
      if (err) {
        log.info('Error while fetching github user information.', err);
        resolve({});
      } else {
        log.info('Github informations successfully retrieved.');
        var responseObject = JSON.parse(JSON.stringify(responseText));
        resolve({
          github: true,
          realname: responseObject.name,
          githubUrl: responseObject.html_url,
          email: responseObject.email
        });
      }
    };
    var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
    var githubOptions = {
      version: '3.0.0'
    };

    if (proxy) {
      githubOptions.proxy = {};
      githubOptions.proxy.host = url.parse(proxy).hostname;
      githubOptions.proxy.port = url.parse(proxy).port;
    }

    var github = new GitHubApi(githubOptions);
    log.info('Get GitHub informations');
    github.user.getFrom({
      user: username
    }, cb);
  });
};

/**
 * Synchronise
 */
Utils.synchro = function (resolve) {
    return through2.obj(function (data, enc, cb) {
      cb();
    },
    function () {
      resolve();
    });
};

/**
 * Add versions of packages
 */
Utils.addPkgVersions = function(anwser){
  var json = require('../package.json');
  if (!anwser.versionsPkg) anwser.versionsPkg = {};

  Object.keys(json.versionsPackages).forEach(function(pkg) {
    anwser.versionsPkg[_s.camelize(pkg)] = json.versionsPackages[pkg];
  });

  return anwser;
};

/**
 * promisify
 */
Utils.mkdirp = function (path){
  return mkdirpAsync(process.cwd() + path);
};

var cachePKG = null;

Utils.getPKG = function() {
  return new Promise(function(resolve, reject) {
    if (null == cachePKG) {
      fs.readFile(process.cwd() + '/package.json', 'UTF-8', function(err, data) {
        if (err) {
          return reject(err);
        }
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    } else {
      setImmediate(function() {
        resolve(cachePKG);
      });
    }
  });
};

Utils.isGaiaProject = function() {
  return new Promise(function(resolve, reject) {
    Utils.getPKG()
      .then(function(pkg) {
        var isGaia = pkg.dependencies.hasOwnProperty('gaiajs');
        if (isGaia) {
          resolve(true);
        } else {
          reject('Project must be an gaiajs project');
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

exports = module.exports = Utils;
