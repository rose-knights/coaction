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
    templateUrl: 'static/new-tasks/new-task.html'
  });
}]).controller('NewTaskCtrl', ['$location', 'taskService', 'Task', function ($location, taskService, Task) {

  var self = this;
  self.task = Task();

  self.addTask = function () {
    taskService.addTask(self.task).then(self.goToTasks);
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }

}]);

app.factory('taskService', ['$http', '$log', function($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, task));
  }

  function put(url, data) {
    return processAjaxPromise($http.put(url, data));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      var data = result.data;
      console.log(data.tasks);
      return data.tasks;
    })
    .catch(function (error) {
      $log.log(error);
      throw error;
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
      return post('/tasks/', task);
    },

    removeTask: function (id) {
      return remove('/tasks/' + id);
    },

    updateTask: function (id, data) {
      return put('/tasks/' + id, data);
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
.controller('TaskCtrl', ['$location', 'tasks', 'taskService', function ($location, tasks, taskService) {
  var self = this;

  self.tasks = tasks;

  self.removeTask = function (id) {
    taskService.removeTask(id).then(function () {
      for (var i = 0; i < self.tasks.length; ++i) {
        if (self.tasks[i].id === id) {
          self.tasks.splice(i, 1);
          break;
        }
      }
    }).catch(function () {
      alert('failed to delete');
    })
  }

  self.addTaskPage = function () {
    $location.path('/new-task');
  }

  self.changeStatus = function (task, status) {
    task.status = status;
    taskService.updateTask(task.id, task);
  }

}]);

app.factory('Task', function () {
  return function (spec) {
    spec = spec || {};
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