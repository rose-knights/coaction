app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'static/users/signup.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  });
}]).controller('NewUserCtrl', ['$location', 'userService', 'User', function ($location, userService, User) {

  var self = this;
  self.user = User();

  self.addUser = function () {
    userService.addUser(self.user).then(self.goToTasks);
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }
}]);
