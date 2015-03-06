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

app.factory('taskService', ['$http', '$log', function($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function put(url, task) {
    return processAjaxPromise($http.put(url, task));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      var data = result.data;
      console.log(data.tasks);
      return data.tasks;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    getTaskList: function () {
      return get('/tasks/');
    },

    getTaskById: function (id) {
      return get('/tasks/' + id);
    },

    addTask: function (task) {
      return put('/tasks/', task);
    }
  };
}]);

app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/my-tasks.html',
    controller: 'TaskCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['taskService', function (taskService) {
        return taskService.getTaskList();
      }]
    }
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/my-tasks', routeDefinition);
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
  };
});

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

//# sourceMappingURL=app.js.map