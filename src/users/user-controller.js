app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/login.html',
    controller: 'UserCtrl',
    controllerAs: 'vm',
    // resolve: {
    //   users: ['userService', function (userService) {
    //     return userService.getUserList();
    //   }]
    // }
  }

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/login', routeDefinition);
}])
.controller('UserCtrl', ['$location', 'userService', function($location, userService){
  var self = this;
  // self.users = users;

  self.addUserPage = function () {
    $location.path('/signup');
  }

  self.login = function (username) {
    for (var i = 0; i < self.users.length; ++i) {
      if (self.users[i].username === username) {
        return userService.loginUser();
        break;
      }
    }
  }
}]);
