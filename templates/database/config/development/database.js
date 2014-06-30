/**
   List of persistences
   Structure of persistence: (see drivers for specific configuration)
   { 
    name: name of persistence
    driver: driver,
    connection: object connexion (depends to driver)

    debug: set debug query (default false),

    onRun: path of on run method or method
  }
 */
exports.persistences = [{ 
  name: '',
  driver: 'gaiajs-driver-mongoose',
  connection: {
    server: 'localhost',
    user: '',
    password: '',
    database: ''
  },

  onRun: function $inject($log) {
    return function *() {
      $log.info("persistence run !");
    };
  }
}];