// This is where any explicit script odering should
// be declared.
module.exports = {
  app: [
    './src/app.js',
    './src/**/!(init.js).js',
    './src/init.js'
  ],

  vendor: [
    '/bower_components/jquery/dist/jquery.min.js',
    '/bower_components/jquery-ui/jquery-ui.min.js'
  ]
};
