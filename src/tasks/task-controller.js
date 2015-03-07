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

  self.changeStatus = function (id) {
    taskService.changeStatus(id, id.status);
  }

}]);
