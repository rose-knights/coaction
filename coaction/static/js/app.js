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

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-task', {
    controller: 'NewTaskCtrl',
    controllerAs: 'vm',
    templateUrl: 'static/new-task.html'
  });
}]).controller('NewTaskCtrl', [function () {

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
.controller('TaskCtrl', [function () {

}]);

app.factory('Task', function () {
  return function (spec) {
    spec || {};
    return {
      title: spec.title,
      description: spec.description,
      status: spec.status,
      createdOn: spec.createdOn,
      dueOn: spec.dueOn
    };
  }
});

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

//# sourceMappingURL=app.js.map