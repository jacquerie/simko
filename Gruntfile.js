module.exports = function( grunt ) {
  grunt.initConfig( {
    jscs: {
      all: {
        src: [ "Gruntfile.js", "js/application.js" ]
      }
    },
    jshint: {
      all: {
        src: [ "Gruntfile.js", "js/application.js" ],
        options: {
          jshintrc: true
        }
      }
    },
    jsonlint: {
      pkg: {
        src: [ ".jscsrc", ".jshintrc", "package.json", "data/tibor-mock.json" ]
      }
    }
  } );

  require( "load-grunt-tasks" )( grunt );

  grunt.registerTask( "default", [ "jsonlint", "jshint", "jscs" ] );
};
