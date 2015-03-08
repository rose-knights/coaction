app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/login.html',
    controller: 'UserCtrl',
    controllerAs: 'vm'
    // resolve: {
    //   users: ['userService', function (userService) {
    //     return userService.getUserList();
    //   }]
    // }
  }

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/login', routeDefinition);
}])
.controller('UserCtrl', ['$location', 'userService', 'User', function($location, userService, User){
  var self = this;
  self.user = User();
  // self.users = users;

  self.addUserPage = function () {
    $location.path('/register');
  }

  self.loginUser = function (user) {
    return userService.loginUser(self.user).then(function () {
      return self.goToTasks();
    });
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }
}]);
