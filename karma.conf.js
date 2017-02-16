// Karma configuration
// Generated on Wed Aug 24 2016 19:16:42 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // vendor
        'src/bower_components/html5shiv/dist/html5shiv.min.js',
        'src/bower_components/respondJS/dest/respond.min.js',
        'src/bower_components/jquery/dist/jquery.js',
        'src/bower_components/angular/angular.js',
        'src/bower_components/angular-route/angular-route.js',
        'src/bower_components/angular-sanitize/angular-sanitize.js',
        'src/bower_components/angular-mocks/angular-mocks.js',
        'src/bower_components/underscore/underscore.js',

        // app
        'src/app/App/module_app.js',
        'src/app/Component/module_component.js',
        'src/app/Content/module_content.js',
        'src/app/Session/module_session.js',
        'src/app/Util/module_util.js',
        'src/app/WebRequest/module_webRequest.js',
        'src/app/**/*.js',
        'src/assets/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    //Spec reporter options
    specReporter: {
        maxLogLines: 5,         // limit number of lines logged per test 
        suppressErrorSummary: true,  // do not print error summary 
        suppressFailed: false,  // do not print information about failed tests 
        suppressPassed: false,  // do not print information about passed tests 
        suppressSkipped: true,  // do not print information about skipped tests 
        showSpecTiming: false // print the time elapsed for each spec 
    },

    // plugins
    plugins: [
        "karma-jasmine",
        "karma-phantomjs-launcher",
        "karma-spec-reporter"
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
