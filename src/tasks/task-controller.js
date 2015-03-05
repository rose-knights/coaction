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
