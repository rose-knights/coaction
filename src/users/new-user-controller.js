app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'static/users/register.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  });
}]).controller('NewUserCtrl', ['$location', 'userService', 'User', function ($location, userService, User) {

  var self = this;
  self.user = User();

  self.addUser = function () {
    console.log(self.user);
    userService.addUser(self.user).then(self.goToTasks());
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }
}]);
