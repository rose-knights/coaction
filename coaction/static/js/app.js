// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);


app.factory('taskService', ['$http', function($http) {
  
}]);

app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/tasks.html',
    controller: 'TaskCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['taskService', function (taskService) {
        return taskService.getTaskList();
      }]
    }
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/tasks', routeDefinition);
}])
.controller('TaskCtrl', function () {

});

app.factory('Task', function () {

});

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

//# sourceMappingURL=app.js.map