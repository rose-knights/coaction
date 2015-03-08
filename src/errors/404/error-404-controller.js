app.controller('Error404Ctrl', ['$location', function ($location) {
  var self = this;

  this.message = 'Could not find: ' + $location.url();
  self.goBack = function() {
    location.reload();
  }
}]);
