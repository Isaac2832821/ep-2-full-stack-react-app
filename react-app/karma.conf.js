// Karma configuration
const webpack = require('webpack');
const path = require('path');

module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine', 'webpack'],

    // List of files / patterns to load in the browser
    files: [
      'src/**/*.jasmine.test.js',
      'src/**/*.spec.js'
    ],

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      'src/**/*.jasmine.test.js': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },

    // Webpack configuration
    webpack: {
      mode: 'development',
      stats: {
        warnings: false,
        errorDetails: false
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test')
          }
        })
      ]
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Test results reporter to use
    reporters: ['progress', 'coverage'],

    // Coverage reporter configuration
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Web server port
    port: 9876,

    // Enable / disable colors in the output
    colors: true,

    // Level of logging
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    concurrency: Infinity,

    // Browser timeout
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,

    // Client configuration
    client: {
      jasmine: {
        random: false,
        stopSpecOnExpectationFailure: false
      }
    }
  });
};
