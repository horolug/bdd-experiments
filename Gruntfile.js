module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dev: {
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },

    jasmine : {

      test : {
        src: 'js/paint.js',
        options: {
          specs: 'tests/paint-spec.js'
        }
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['less']);
  grunt.registerTask('test', ['jasmine']);

};
