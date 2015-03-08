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

  // $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/my-tasks', routeDefinition);
}])
.controller('TaskCtrl', ['$location', 'tasks', 'taskService', 'userService', function ($location, tasks, taskService, userService) {
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

  self.logoutUser = function () {
    alert('fire');
    return userService.logoutUser().then(self.goToLoginPage());
  }

  self.goToLoginPage = function () {
    $location.path('/login');
  }

}]);
