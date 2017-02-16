'use strict';

module.exports = function (grunt){

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // configurable paths
        yeoman: {
            app:  'src',
            dist: 'dist'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                force: true
            },
            all: [
                'Gruntfile.js',
                '!**/*.spec.js',
                '<%= yeoman.app %>/app/**/*.js',
                '<%= yeoman.app %>/assets/**/*.js'
            ]
        },

        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },

        // Wipe away entire dist folder
        clean: {
            all: {
                files: [
                    {
                        dot: true,
                        src: ['<%= yeoman.dist %>/*']
                    }
                ]
            }
        },

        // Compile less files 
        // don't compress yet, cssmin will do that
        less: {
            all: {
                options: {
                    paths: ['<%= yeoman.app %>/assets/css/_less_/'],
                    cleancss: false,
                    compress: false
                },
                files: {
                    '<%= yeoman.app %>/assets/css/main.css': '<%= yeoman.app %>/assets/css/_less_/main.less'
                }
            }
        },

        copy: {

            // Copy files built by usemin that isn't in the dev build
            dev: {
                files: [
                    // Bower Components
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components',
                        src: ['**'],
                        dest: '<%= yeoman.dist %>/bower_components'
                    },
                    // App
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/app',
                        src: ['**/*.js', '!**/*.spec.js'],
                        dest: '<%= yeoman.dist %>/app'
                    }
                ]
            },

            // Copy files to dist directory
            all: {
                files: [
                    // Bower Component Font Files
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= yeoman.app %>/bower_components',
                        src: ['bootstrap/dist/fonts/*', 'font-awesome/fonts/*'],
                        dest: '<%= yeoman.dist %>/assets/fonts'
                    },
                    // Main App Templates
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['**/*.html'],
                        dest: '<%= yeoman.dist %>'
                    },
                    // Main App Assets
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/assets',
                        src: ['**/*', '!_less_'],
                        dest: '<%= yeoman.dist %>/assets'
                    },
                    // Main App Configurations + Data
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: ['configs/**.json', 'data/**.json']
                    }
                ]
            }
        },

        'json-minify': {
            build: {
                files: '<%= yeoman.dist %>/configs/**/*.json'
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
          html: '<%= yeoman.app %>/index.html',
          options: {
            dest: '<%= yeoman.dist %>',
            flow: {
              html: {
                steps: {
                  js: ['concat', 'uglify'],
                  css: ['cssmin']
                },
                post: {}
              }
            }
          }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/index.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        concat: {
            options: {
                separator: ';'
            }
        },
/*
        uglify: {
            options: {
                beautify : true,
                mangle   : true
            }
        },
*/

        ngdocs: {
           options: {
               dest: '<%= yeoman.dist %>/docs',
               html5Mode: false,
               scripts: [
                   '<%= yeoman.app %>/bower_components/angular/angular.js',
                   '<%= yeoman.app %>/bower_components/angular-animate/angular-animate.js'
               ]
           },
           api: {
               src: ['<%= yeoman.app %>/app/**/*.js'],
               title: 'Docs'
           }
        }
    });

    grunt.registerTask('build:dev', [
        'clean:all',
        'less:all',
        'copy:dev',
        'copy:all',
        'docs'
    ]);
    grunt.registerTask('build', [
        'clean:all',
        'less:all',
        'copy:all',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'json-minify',
        'docs'
    ]);
    grunt.registerTask('css', [
        'less:all'
    ]);
    grunt.registerTask('test', [  
        'jshint',
        'karma'
    ]);
    grunt.registerTask('docs', [
        'ngdocs:api'
    ]);
    grunt.registerTask('default', ['build']);
};