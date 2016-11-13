module.exports = function(grunt) {
  grunt.initConfig({
    browserify : {
      '../dist/app.js': ['../js/main.js'] 
    },
    jshint: {
      files: ['../js/**/*.js'],  //this is the folder where all JS code should be located.  
            //It looks for ANY file that ends in '.js' in the 'js' folder
      options: {
        predef: ["document", "console", "$", "require", "module"],  //predefined
        esnext: true,
        globalstrict: true,
        globals: {"songList": true, "anotherArray": true, "dataMover": true, "yetAnotherArray": true},  //put global variables here ex: {"Sandwich": true}
        browserify: true
      }
    },
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist',
        src: ['**'],
        dest: '../dist'
      },
      jquery: {
         expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: '../dist'
      }
    },
    sass: {
      dist: {
        files: {
          '../css/styles.css': '../sass/styles.scss'  
    //this creates a file called main.css FROM sass/main.scss
        }
      }
    },
    watch: {  //this performs the tasks above automatically whenever something is changed.
      js: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      browserify: {
        files: ['../js/*.js'],
        tasks: ["browserify"]
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', [ 'jshint', 'copy', 'sass', 'browserify', 'watch']);  
//now, just typing 'grunt' will run this and the watch task will take over.
};