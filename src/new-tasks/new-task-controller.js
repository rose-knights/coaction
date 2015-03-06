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
