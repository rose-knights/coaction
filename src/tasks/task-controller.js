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
.controller('TaskCtrl', ['tasks', 'taskService', function (tasks, taskService) {
  var self = this;

  self.tasks = tasks;

  self.removeTask = function (id) {
    taskService.removeTask(id);
  }

}]);
