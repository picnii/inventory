// Karma configuration
// Generated on Thu Nov 06 2014 15:40:36 GMT+0700 (ICT)

module.exports = function(config) {
  config.set({
    preprocessors: {
             'component/**/*.html': ['ng-html2js'],
             'component/*.html': ['ng-html2js']
    },
 
     ngHtml2JsPreprocessor: {
         // setting this option will create only a single module that contains templates
         // from all the files, so you can load them all with module('foo')
         moduleName: 'templates'
     },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/jquery-1.11.1.min.js',
      'lib/angular/angular.min.js',
      'lib/angular/angular-route.min.js',
      'lib/angular/angular-mocks.js',
      'lib/*.js',
      'lib/**/js/*.js',
      'js/app.js',
      'widget/widget.js',
      'component/component.js',
      'js/*.js',
      'js/**/*.js',
      'test/**/*Spec.js',
      'component/**/*.html',
      'component/*.html'
    ],


    // list of files to exclude
    exclude: [
      
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
