'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.initConfig({
    coffee: {
      app: {
        options: { join: true },
        files: {
          'build/app.js': 'coffee/**/*.coffee'
        }
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: 'less',
          src: ['*.less', '!.*#.less'],
          dest: 'build/',
          ext: '.css'
        }]
      }
    },
    clean: {
      main: ['build/**/*']
    },
    concat: {
      js: {
        src: ['build/*.js'],
        dest: 'build/app.js'
      },
      css: {
        src: ['build/*.css'],
        dest: 'build/raw.app.css'
      },
      css_lib: {
        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
        dest: 'build/lib.css'
      }
    },
    watch: {
      main: {
        files: ['less/**/*.less'],
        tasks: ['build'],
        options: {
          events: ['changed', 'added'],
          nospawn: true
        }
      }
    },
    autoprefixer: {
      single_file: {
        options: {
        },
        src: 'build/raw.app.css',
        dest: 'build/app.css'
      }
    }
  });

  grunt.registerTask('build', ['clean', 'coffee', 'less', 'concat', 'autoprefixer']);
};
