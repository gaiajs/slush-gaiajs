exports.persistences = [{
  name: "default",
  driver: 'gaiajs-driver-mongoose',

  onRun: function $inject($log) {
    return function *() {
      $log.info("persistence run !");
    };
  }
}];
