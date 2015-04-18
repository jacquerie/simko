module.exports = function( grunt ) {
  grunt.initConfig( {
    jscs: {
      all: {
        src: [ "Gruntfile.js" ]
      }
    },
    jshint: {
      all: {
        src: [ "Gruntfile.js" ],
        options: {
          jshintrc: true
        }
      }
    },
    jsonlint: {
      pkg: {
        src: [ "package.json", "data/tibor-mock.json" ]
      }
    }
  } );

  require( "load-grunt-tasks" )( grunt );

  grunt.registerTask( "default", [ "jsonlint", "jshint", "jscs" ] );
};
